// SDF raymarcher fragment shader (GLSL ES 1.0 — works on WebGL1 and WebGL2).
//
// Scene: a realistic smoke puff (participating medium, no hard surface)
// pierced by a looping bullet shot. The distorted shock cone is SUBTRACTED
// from the smoke (carved tunnel with rippled walls): it suppresses the
// smoke, turbules it, makes it glow, and shimmers the background behind it
// like hot air. The bullet is a simple sphere — the only opaque SDF.
// Everything loops seamlessly every LOOP_DURATION.
//
// Techniques:
//   - Camera ray per-pixel from camera uniforms (position + basis + FOV).
//   - Opaque march: bullet sphere + perturbed ground slab SDFs.
//   - Volume march: analytic bounds, Beer-Lambert, HG scattering, heat glow.
//   - Secondary rays: ground reflection marches the smoke volume;
//     thin-slab refraction transmits the scene behind the slab.
//   - Volume march: analytic bounds intersect, front-to-back Beer-Lambert
//     accumulation, Henyey-Greenstein-ish scattering, heat emission.
//   - Heat shimmer: hot-air column offsets the background lookup direction
//     with animated Perlin noise (optical distortion from heated air).
//   - Billow density from Perlin fBm; smoke colour / heat colour are uniforms.
//
// Uniform names must stay in sync with RaymarchCanvas.vue (cacheUniformLocations).
precision highp float;

varying vec2 vNdc;

// --- Camera uniforms ---
uniform vec3 uCameraPosition;  // ray origin
uniform vec3 uCameraForward;   // look direction (need not be normalized; normalized in-shader)
uniform vec3 uCameraUp;        // world up hint
uniform float uCameraFov;       // vertical field of view, degrees
uniform float uAspectRatio;    // canvasWidth / canvasHeight

// --- Smoke medium uniforms ---
uniform float uSmokeRadius;    // base radius of the smoke puff
uniform float uSmokeDensity;   // extinction scale (absorption + scattering)
uniform vec3 uSmokeColor;      // smoke albedo / body colour
uniform float uScatter;        // directional scattering brightness
uniform float uAnisotropy;     // scattering lobe (-0.85 back .. +0.85 forward)

// --- Heat uniforms ---
uniform vec3 uHeatColor;       // hot-air emission colour
uniform float uHeatStrength;   // heat glow + shimmer strength

// --- Perlin billow uniforms ---
uniform float uNoiseAmplitude;  // silhouette erosion strength
uniform float uNoiseFrequency;  // base spatial frequency of the billows
uniform int uNoiseOctaves;      // fBm octave count, 1..MAX_OCTAVES
uniform float uLacunarity;      // frequency multiplier per octave (~2.0)
uniform float uNoiseGain;       // amplitude multiplier per octave / persistence (~0.5)
uniform float uNoiseSpeed;      // noise-time travel amount (loop-safe sine swing)

// --- Shockwave cone uniforms (uConeAngleDeg = FULL apex angle) ---
uniform float uConeAngleDeg;
uniform float uConeLength;     // shock-cone wake length behind the bullet
uniform float uPush;           // shock displacement: 0 = carve only, higher piles a compression shell

// --- Compression turbulence uniforms ---
uniform float uRippleAmp;      // turbulence strength on smoke near the cone
uniform float uRippleFreq;     // spatial frequency of the turbulence

// --- Ground slab uniforms (square surface with thickness) ---
uniform float uGroundAmp;      // near-camera perturbation strength (0 = flat)
uniform float uGroundPeriod;   // perturbation cell size in world units
uniform int uGroundOct;        // perturbation octave count, 1..MAX_OCTAVES
uniform float uGroundLac;      // perturbation frequency multiplier per octave

// --- Sphere shatter mode uniforms ---
uniform float uMode;           // 0 = smoke cloud, 1 = plastic sphere
uniform float uShardFreq;      // voronoi cell density (shard size ~ 1/freq)
uniform float uShardMin;       // smallest allowed shard, world units (hard cap)

// --- Visibility & debug uniforms ---
uniform float uShowGround;     // 0 = plane hidden, 1 = visible
uniform float uDebugMode;      // 0 off, 1 compression, 2 heat, 3 density, 4 cone SDF

// --- Sky & sun uniforms ---
uniform vec3 uSunColor;        // sun disc + flare tint
uniform vec3 uSkyColor;        // day zenith tint (dusk/night derived)
uniform float uFlare;          // sun flare strength

// --- Raymarch tuning ---
uniform float uEpsilon;      // opaque surface hit threshold
uniform float uMaxDistance;  // far raymarch limit (camera "far")

// --- Directional light uniforms ---
// uLightDirection: direction FROM the surface TOWARD the light (already normalized on CPU).
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform float uLightIntensity;

// --- Animation / misc ---
uniform float uTime;        // elapsed seconds (looped every 16 s; bullet: 8 s sub-loop)
uniform vec2 uResolution;   // drawing-buffer size in pixels (reserved)

// Constants (LOOP_DURATION must match LOOP_SECONDS in RaymarchCanvas.vue).
const int MAX_STEPS = 64;
const int VOL_STEPS = 24; // 4D noise costs ~2x per step vs 3D; dither hides the cut
const int MAX_OCTAVES = 8;
const float LOOP_DURATION = 16.0;
const float BULLET_WINDOW = 0.125; // one 2 s pass per loop: 4x bullet speed
const float TAU = 6.2831853;
const float BULLET_X1 = 3.2;
const float BULLET_RADIUS = 0.14;
const vec3 SMOKE_CENTER = vec3(0.0, 0.0, 0.0);
// Square ground slab under the smoke: 8x8 footprint, thin 0.25 thickness.
const vec3 GROUND_HALF = vec3(4.0, 0.125, 4.0);
const float SLAB_IOR = 1.3;
const vec3 BACKGROUND_TOP = vec3(0.12, 0.18, 0.32);
const vec3 BACKGROUND_BOTTOM = vec3(0.02, 0.02, 0.05);

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a;
  vec3 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

// Capped cone along +Y, y in [0, h], radius r1 at y=0 -> r2 at y=h (iq).
float sdRoundCone(vec3 p, float r1, float r2, float h) {
  vec2 q = vec2(length(p.xz), p.y);
  float b = (r1 - r2) / h;
  float a = sqrt(1.0 - b * b);
  float k = dot(q, vec2(-b, a));
  if (k < 0.0) return length(q) - r1;
  if (k > a * h) return length(q - vec2(0.0, h)) - r2;
  return dot(q, vec2(a, b)) - r1;
}

// --- Classic Perlin gradient noise (3D) ---
// Based on Ashima Arts / Ian McEwan classicnoise3D.glsl (MIT licence).
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

// Fractal Brownian motion, normalized to roughly [-1, 1].
float fbm(vec3 p, int octaves, float lacunarity, float gain) {
  float sum = 0.0;
  float norm = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < MAX_OCTAVES; ++i) {
    if (i >= octaves) {
      break;
    }
    sum += amp * cnoise(p * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return (norm > 0.0) ? sum / norm : 0.0;
}

// Cheap deterministic dither to hide volume-marching bands.
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// --- 4D Perlin gradient noise (x, y, z + time) ---
// Time rides as the 4th coordinate, so the smoke genuinely evolves instead
// of just shifting 3D noise around. Lattice gradients come from a
// deterministic hash (needs highp); loop safety comes from how w is driven
// (a sine swing that returns to base every loop).
float gradDot4(vec4 cell, vec4 delta) {
  vec4 h = fract(sin(vec4(
    dot(cell, vec4(127.1, 311.7, 74.7, 269.5)),
    dot(cell, vec4(269.5, 183.3, 246.1, 124.6)),
    dot(cell, vec4(113.5, 271.9, 124.6, 263.2)),
    dot(cell, vec4(246.1, 124.6, 269.5, 183.3)))) * 43758.5453) * 2.0 - 1.0;
  float gl = max(length(h), 0.0001);
  return dot(h / gl, delta);
}

float pnoise4(vec4 P) {
  vec4 Pi = floor(P);
  vec4 Pf = fract(P);
  vec4 f = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
  float n0000 = gradDot4(Pi + vec4(0.0, 0.0, 0.0, 0.0), Pf - vec4(0.0, 0.0, 0.0, 0.0));
  float n1000 = gradDot4(Pi + vec4(1.0, 0.0, 0.0, 0.0), Pf - vec4(1.0, 0.0, 0.0, 0.0));
  float n0100 = gradDot4(Pi + vec4(0.0, 1.0, 0.0, 0.0), Pf - vec4(0.0, 1.0, 0.0, 0.0));
  float n1100 = gradDot4(Pi + vec4(1.0, 1.0, 0.0, 0.0), Pf - vec4(1.0, 1.0, 0.0, 0.0));
  float n0010 = gradDot4(Pi + vec4(0.0, 0.0, 1.0, 0.0), Pf - vec4(0.0, 0.0, 1.0, 0.0));
  float n1010 = gradDot4(Pi + vec4(1.0, 0.0, 1.0, 0.0), Pf - vec4(1.0, 0.0, 1.0, 0.0));
  float n0110 = gradDot4(Pi + vec4(0.0, 1.0, 1.0, 0.0), Pf - vec4(0.0, 1.0, 1.0, 0.0));
  float n1110 = gradDot4(Pi + vec4(1.0, 1.0, 1.0, 0.0), Pf - vec4(1.0, 1.0, 1.0, 0.0));
  float n0001 = gradDot4(Pi + vec4(0.0, 0.0, 0.0, 1.0), Pf - vec4(0.0, 0.0, 0.0, 1.0));
  float n1001 = gradDot4(Pi + vec4(1.0, 0.0, 0.0, 1.0), Pf - vec4(1.0, 0.0, 0.0, 1.0));
  float n0101 = gradDot4(Pi + vec4(0.0, 1.0, 0.0, 1.0), Pf - vec4(0.0, 1.0, 0.0, 1.0));
  float n1101 = gradDot4(Pi + vec4(1.0, 1.0, 0.0, 1.0), Pf - vec4(1.0, 1.0, 0.0, 1.0));
  float n0011 = gradDot4(Pi + vec4(0.0, 0.0, 1.0, 1.0), Pf - vec4(0.0, 0.0, 1.0, 1.0));
  float n1011 = gradDot4(Pi + vec4(1.0, 0.0, 1.0, 1.0), Pf - vec4(1.0, 0.0, 1.0, 1.0));
  float n0111 = gradDot4(Pi + vec4(0.0, 1.0, 1.0, 1.0), Pf - vec4(0.0, 1.0, 1.0, 1.0));
  float n1111 = gradDot4(Pi + vec4(1.0, 1.0, 1.0, 1.0), Pf - vec4(1.0, 1.0, 1.0, 1.0));
  // Interpolate: x, then y, then z, then w.
  float x000 = mix(n0000, n1000, f.x);
  float x100 = mix(n0100, n1100, f.x);
  float x010 = mix(n0010, n1010, f.x);
  float x110 = mix(n0110, n1110, f.x);
  float x001 = mix(n0001, n1001, f.x);
  float x101 = mix(n0101, n1101, f.x);
  float x011 = mix(n0011, n1011, f.x);
  float x111 = mix(n0111, n1111, f.x);
  float y00 = mix(x000, x100, f.y);
  float y10 = mix(x010, x110, f.y);
  float y01 = mix(x001, x101, f.y);
  float y11 = mix(x011, x111, f.y);
  float z0 = mix(y00, y10, f.z);
  float z1 = mix(y01, y11, f.z);
  return mix(z0, z1, f.w) * 1.5;
}

// 4D fractal Brownian motion, normalized to roughly [-1, 1].
float fbm4(vec4 p, int octaves, float lacunarity, float gain) {
  float sum = 0.0;
  float norm = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < MAX_OCTAVES; ++i) {
    if (i >= octaves) {
      break;
    }
    sum += amp * pnoise4(p * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return (norm > 0.0) ? sum / norm : 0.0;
}

// --- 16-second loop helpers (one blazing bullet pass per loop) ---
// All animation derives from the loop phase with INTEGER cycle counts or a
// circular domain offset, so the last frame wraps seamlessly to the first.
float loopPhase() {
  return fract(uTime / LOOP_DURATION);
}

float bulletX(float phase) {
  return mix(SMOKE_CENTER.x - uSmokeRadius, BULLET_X1, phase);
}

void loopState(out float phase, out float fade, out float bx, out float coneOX, out float baseR) {
  phase = loopPhase();
  // Single blazing pass per loop: spawn in contact, cross while phase <
  // window, parked invisible (fade 0) the rest of the loop.
  float w = min(phase / BULLET_WINDOW, 1.0);
  fade = smoothstep(0.0, 0.08, w) * (1.0 - smoothstep(0.92, 1.0, w));
  // Spawn in contact: shape_position - flight_dir * shape_radius.
  float bx0 = SMOKE_CENTER.x - uSmokeRadius;
  bx = mix(bx0, BULLET_X1, w);
  coneOX = bx - 0.05;
  baseR = uConeLength * tan(radians(uConeAngleDeg * 0.5));
}

// Opaque scene: bullet sphere (mat 1) + ground slab (mat 2).
float bulletSDF(vec3 p, float bx, float fade) {
  return sdSphere(p - vec3(bx, 0.0, 0.0), BULLET_RADIUS * fade);
}

// Ground slab perturbed by Perlin fBm ONLY near the camera:
// the displacement fades out with distance, far field stays flat.
// Ground slab perturbed by Perlin fBm + a traveling wave that starts at
// one corner (-x,-z) and fades to zero toward the other corners
// (2 wavefronts per loop -> seamless).
// Plane height follows the radius slider so it never touches the sphere:
// sphere mode kisses the ball's underside, cloud mode clears the wispy extent.
vec3 groundCenter() {
  float top = (uMode > 0.5)
    ? -uSmokeRadius - 0.1
    : -(uSmokeRadius * 1.35 + 0.2);
  return vec3(0.0, top - GROUND_HALF.y, 0.0);
}

float groundSDF(vec3 p, vec3 ro) {
  float d = sdBox(p - groundCenter(), GROUND_HALF);
  if (uGroundAmp > 0.0) {
    float phase = loopPhase();
    float dc = length(p.xz - vec2(-GROUND_HALF.x, -GROUND_HALF.z));
    float env = exp(-dc * 0.45);
    if (env > 0.004) {
      vec3 gp = p / max(uGroundPeriod, 0.05);
      float bumps = fbm(gp, uGroundOct, uGroundLac, 0.5) * 0.6
        + sin(dc * 6.0 - phase * TAU * 4.0) * 0.4;
      d += bumps * uGroundAmp * env;
    }
  }
  return d;
}

// 3D voronoi: F1, F2 and a per-cell id seed (iq-style exhaustive 27 taps).
vec3 vhash3(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(p) * 43758.5453);
}

vec4 voronoi(vec3 p, out vec3 feat) {
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  float id = 0.0;
  vec3 bestR = vec3(0.0);
  for (int k = -1; k <= 1; ++k) {
    for (int j = -1; j <= 1; ++j) {
      for (int i = -1; i <= 1; ++i) {
        vec3 g = vec3(float(i), float(j), float(k));
        vec3 o = vhash3(ip + g);
        vec3 r = g + o - fp;
        float d = dot(r, r);
        if (d < f1) {
          f2 = f1;
          f1 = d;
          id = o.x * 7.0 + o.y * 5.0 + o.z * 3.0;
          bestR = r;
        } else if (d < f2) {
          f2 = d;
        }
      }
    }
  }
  feat = bestR; // p + feat = feature point, stable per chunk forever
  return vec4(sqrt(f1), sqrt(f2), id, 0.0);
}

// Plastic sphere (same radius as the smoke) that shatters along voronoi
// partitions once the bullet touches it. The partition field is frozen in
// object space (graded once by the impact crater, never by the moving
// bullet) so the initial pieces persist along the whole animation.
// Each partition moves as a rigid body driven by the SAME air-pressure
// field that squeezes the smoke: centroid-sampled shell/stagnation push
// throws it along the shock-surface normal, and it rolls off that surface
// with pressure-scaled spin. No hard-coded bullet push, no gravity.
// tSince = seconds since impact (0 = intact sphere).
// Cell size grades with distance from the impact crater (frozen, static):
// small dense shards near the hit, big plates far away. Impact-only —
// never time- or bullet-varying — so the split stays intact forever.
// (With graded frequency the pivot is approximate to ~8% of a cell, a
// static micro-bend, invisible next to the chunks themselves.)
// uShardMin floors the piece size as a safety cap.
float shardFreqAt(vec3 p) {
  vec3 rel = p - SMOKE_CENTER;
  float dI = length(rel - vec3(-uSmokeRadius, 0.0, 0.0));
  // Far field settles to ~4 coarse plates; the crater term subdivides down
  // to rubble as distance -> 0.
  float far = smoothstep(0.0, 2.0 * uSmokeRadius, dI);
  float crater = 1.0 - far;
  float freq = uShardFreq * (mix(1.0, 0.18, far) + crater * crater * 2.5);
  return min(freq, 1.0 / max(uShardMin, 0.02));
}

// Gap half-width along partition borders: opens fast after impact, holds.
// Scaled to the cell size so gaps read as empty at any shard frequency
// without ever swallowing whole pieces.
float gapHalfWidth(float tSince, float freq) {
  return min(tSince * 0.25, 0.175 / freq);
}

// Proper rotation matrix (Rodrigues, column-major): det +1, orthogonal.
mat3 rotAxisAngle(vec3 ax, float an) {
  float c = cos(an);
  float s = sin(an);
  float ic = 1.0 - c;
  float x = ax.x;
  float y = ax.y;
  float z = ax.z;
  return mat3(
    c + x * x * ic, y * x * ic + z * s, z * x * ic - y * s,
    x * y * ic - z * s, c + y * y * ic, z * y * ic + x * s,
    x * z * ic + y * s, y * z * ic - x * s, c + z * z * ic);
}

float coneField(vec3 p, float phase, float fade, float coneOX, float baseR);

// Last chunk-frame border from marching (SDF -> shading handoff, below).
float gBorderW = 10.0;

float sphereShatterSDF(vec3 p, float tSince) {
  if (tSince <= 0.0) {
    return sdSphere(p - SMOKE_CENTER, uSmokeRadius);
  }
  vec3 rel = p - SMOKE_CENTER;
  float freq = shardFreqAt(p);
  // Cheap far exit: all debris stays within reach of the original shell,
  // so distant samples return a valid bound with zero voronoi cost.
  // (This is also what restores full speed: most march steps exit here.)
  float reach = 3.5 / freq + 0.3;
  float dFar = length(rel) - uSmokeRadius - reach;
  if (dFar > 0.0) {
    return dFar;
  }
  vec3 feat;
  vec4 v = voronoi((p - SMOKE_CENTER) * freq, feat);
  vec3 pivot = p + feat * min(1.0 / freq, 0.75); // chunk centroid, offset clamped:
  // far cells would otherwise place it units away, turning the whole chunk
  // frame (motion, normals, shading) into background speckle. Near-sphere
  // cells (freq > 1.33) are untouched.
  vec3 rnd = vhash3(vec3(v.z * 3.1, v.z * 7.7, v.z * 5.3)) - 0.5;
  // Impact-frozen loop state (spawn puts the bullet center exactly on the
  // surface, so impact is at window start): chunk ballistics lock to
  // hit-time conditions, so every fragment keeps its exact dimensions
  // and shape for the whole animation.
  float coneOX = SMOKE_CENTER.x - uSmokeRadius - 0.05;
  float baseR = uConeLength * tan(radians(uConeAngleDeg * 0.5));
  // Air pressure sampled ONCE at impact time from the SMOOTH base cone
  // (same shell/stagnation model as the smoke, minus ripple detail so
  // neighboring chunks agree and the debris flows coherently instead of
  // tearing into jitter). Everything below derives from the pivot (never
  // from p or from live bullet state), so each chunk moves as one rigid
  // body: constant velocity, constant spin.
  vec3 conePs = vec3(pivot.y, coneOX - pivot.x, pivot.z);
  float dCp = sdRoundCone(conePs, 0.03, baseR, uConeLength);
  float sbp = (dCp - 0.12) * 9.0;
  float shellp = exp(-sbp * sbp);
  float sAh = pivot.x - (coneOX + 0.19);
  float qa = sAh / 0.35;
  float qr = length(pivot.yz) / 0.30;
  float stagp = (sAh > -0.1)
    ? exp(-(qa * qa + qr * qr)) * smoothstep(-0.1, 0.15, sAh)
    : 0.0;
  float press = shellp * 1.2 + stagp * 0.8
    - (1.0 - smoothstep(-0.35, 0.05, dCp)) * 0.9;
  float push = max(press, 0.0);
  vec3 n0 = (pivot - SMOKE_CENTER) / max(length(pivot - SMOKE_CENTER), 0.001);
  vec3 R = reflect(vec3(1.0, 0.0, 0.0), n0);
  float facing = clamp(dot(n0, vec3(-1.0, 0.0, 0.0)), 0.0, 1.0);
  // Smoke-coupled flight: advect with the same shock flow that streams the
  // smoke itself (radial from the cone axis, scaled by the Shock push
  // slider), blended toward the bullet-reflection spray by impact facing.
  // Bounded ease-out hover keeps the cell lookup valid while rotation (exact
  // at any angle) provides the drama. All inputs frozen per chunk.
  float pb = dCp * 3.0;
  float flowBand = exp(-pb * pb);
  vec3 coneR = vec3(0.0, pivot.y, pivot.z);
  float crl = length(coneR);
  vec3 radFlow = (crl > 0.0001) ? coneR / crl : vec3(0.0, 1.0, 0.0);
  vec3 flowRaw = mix(radFlow, R, clamp(0.3 + facing * 0.7, 0.0, 1.0)) + rnd * 0.25;
  vec3 flowDir = flowRaw / max(length(flowRaw), 0.05);
  float drive = clamp(push + facing * 0.5 + flowBand * uPush * 0.5, 0.0, 2.0);
  float sepMax = (0.12 + 0.38 * (drive / 2.0)) / freq;
  vec3 T = flowDir * (sepMax * (1.0 - exp(-tSince * 2.2)));
  // Own rotation: roll in the deflection plane, harder where pressure peaks.
  vec3 ax = cross(R, vec3(1.0, 0.0, 0.0)) + rnd * 0.9;
  float axl = length(ax);
  ax = (axl > 0.001) ? ax / axl : vec3(0.0, 1.0, 0.0);
  float ang = 0.16 * clamp(freq * 0.4, 0.2, 1.0) * (0.4 + min(push, 1.2)) * (0.5 + rnd.y * 1.5) * tSince;
  mat3 Ri = rotAxisAngle(ax, -ang);
  vec3 q = pivot + Ri * (p - pivot - T);
  float dChunk = sdSphere(q - SMOKE_CENTER, uSmokeRadius);
  // Borders are tested in the chunk frame (they move with the pieces): a
  // second voronoi at q keeps the carve glued to the rotating chunks, so no
  // ghost shell lingers in the gaps and no static grid slices the pieces.
  vec3 dummy2;
  vec4 vq = voronoi((q - SMOKE_CENTER) * freq, dummy2);
  float borderW = (vq.y - vq.x) / freq;
  gBorderW = borderW;
  float dOpen = max(dChunk, gapHalfWidth(tSince, freq) - borderW);
  // Far-field bound: a rotated/translated chunk field under-reports distance
  // far away (phantom shapes, e.g. along the flight axis). Clamp it to a
  // bounding sphere of the debris; near chunks are unaffected.
  return max(dOpen, length(rel) - (uSmokeRadius + 4.5));
}

vec2 opaqueScene(vec3 p, vec3 ro, float bx, float fade, float tSince) {
  float b = bulletSDF(p, bx, fade);
  float g = (uShowGround > 0.5) ? groundSDF(p, ro) : 1000.0;
  vec2 best = (b < g) ? vec2(b, 1.0) : vec2(g, 2.0);
  if (uMode > 0.5) {
    float s = sphereShatterSDF(p, tSince);
    if (s < best.x) {
      best = vec2(s, 3.0);
    }
  }
  return best;
}

vec3 groundNormal(vec3 p, vec3 ro) {
  const float h = 0.004;
  return normalize(vec3(
    groundSDF(p + vec3(h, 0.0, 0.0), ro) - groundSDF(p - vec3(h, 0.0, 0.0), ro),
    groundSDF(p + vec3(0.0, h, 0.0), ro) - groundSDF(p - vec3(0.0, h, 0.0), ro),
    groundSDF(p + vec3(0.0, 0.0, h), ro) - groundSDF(p - vec3(0.0, 0.0, h), ro)));
}

// Distorted shock-cone SDF: base cone + animated compression ripple.
// Integer phase cycles keep the ripple loop-safe.
float coneField(vec3 p, float phase, float fade, float coneOX, float baseR) {
  vec3 coneP = vec3(p.y, coneOX - p.x, p.z);
  float d = sdRoundCone(coneP, 0.03 * fade, baseR * fade, uConeLength);
  float apexW = clamp(1.0 - (coneOX - p.x) / uConeLength, 0.0, 1.0);
  vec3 rq = p * uRippleFreq + vec3(phase * TAU * 4.0, phase * TAU * 6.0, 0.0);
  return d + cnoise(rq) * uRippleAmp * (0.35 + 0.65 * apexW) * fade;
}

// Smoke density 0..~1: soft ball falloff shaped by fbm billows,
// with the distorted shock cone SUBTRACTED (carved tunnel, rippled walls)
// and the density adapted to air compression (shock shell squeeze,
// core rarefaction, nose stagnation). Returns vec2(density, heat).
vec2 smokeDensityAt(vec3 p, float phase, float dCone, float fade, float coneOX) {
  float heat = 0.0;
  float pushBand = 0.0;
  float shell = 0.0;
  if (fade > 0.0) {
    float cb = dCone * 4.0;
    heat = exp(-cb * cb) * fade;
    float pb = dCone * 3.0;
    pushBand = exp(-pb * pb) * fade;
    float sb = (dCone - 0.12) * 9.0;
    shell = exp(-sb * sb) * fade;
  }
  float r = length(p - SMOKE_CENTER) / uSmokeRadius;
  if (r > 1.35) {
    return vec2(0.0, heat);
  }
  float fall = clamp(1.0 - r * r, 0.0, 1.0);
  // Shock push: stream the billow domain radially outward around the cone,
  // so smoke slides past the tunnel instead of crossing it.
  vec3 radial = vec3(0.0, p.y, p.z);
  float rl = length(radial);
  vec3 rdir = rl > 0.0001 ? radial / rl : vec3(0.0, 1.0, 0.0);
  // Fixed noise space: xyz is static, only the 4th coordinate (time) moves.
  vec3 q = (p - SMOKE_CENTER + rdir * (pushBand * uPush * 0.6)) * uNoiseFrequency;
  // 4th dimension = loop-safe noise-time: swings out and back every loop,
  // so the last frame wraps seamlessly while the pattern truly evolves.
  float wAmp = 0.15 + 0.85 * uNoiseSpeed;
  float wTime = sin(phase * TAU * 2.0) * wAmp;
  float f = fbm4(vec4(q, wTime), uNoiseOctaves, uLacunarity, uNoiseGain);
  float filament = smoothstep(-0.25, 0.65, f);
  float dens = pow(fall, 1.5) * mix(0.25, 1.0, filament);
  // Billow erosion chews the silhouette.
  dens *= smoothstep(0.0, 0.45, fall + f * uNoiseAmplitude);
  // Hot air expands: thinner smoke, rippled by compression turbulence.
  if (heat > 0.01) {
    vec3 rq = p * uRippleFreq + vec3(phase * TAU * 4.0, phase * TAU * 6.0, 0.0);
    dens *= (1.0 - 0.7 * heat) * (1.0 + heat * uRippleAmp * 9.0 * cnoise(rq));
  }
  // Air compression adapts the smoke density: the shock front squeezes
  // smoke into a denser shell, the hot core rarefies, and stagnation piles
  // air ahead of the bullet nose. uPush scales the whole response
  // (0 = uniform smoke, carve only).
  float stag = 0.0;
  if (fade > 0.0) {
    float sAhead = p.x - (coneOX + 0.19);
    if (sAhead > -0.1) {
      float sa = sAhead / 0.35;
      float sr = length(p.yz) / 0.30;
      stag = exp(-(sa * sa + sr * sr)) * fade * smoothstep(-0.1, 0.15, sAhead);
    }
  }
  float coreRare = (1.0 - smoothstep(-0.35, 0.05, dCone)) * fade;
  float compression = shell * 1.2 + stag * 0.8 - coreRare * 0.9;
  dens *= clamp(1.0 + uPush * compression, 0.0, 3.0);
  // Only the hot core itself is deleted.
  dens *= smoothstep(-0.06, 0.06, dCone);
  // Bow-shock channel ahead of the nose: cleared air the bullet flies in,
  // so it stays visible through the cloud (faded with the bullet).
  if (fade > 0.0) {
    // Channel encloses the WHOLE bullet, tail margin overlapping the cone
    // void behind: previously only the nose tip was cleared (cone mouth is
    // narrower than the bullet), so the rear half sat in dense smoke and
    // rendered nibbled, then swallowed.
    vec3 tail = vec3(coneOX - 0.16, 0.0, 0.0);
    vec3 noseTip = vec3(coneOX + 0.19, 0.0, 0.0) + vec3(1.6, 0.0, 0.0);
    float dBow = sdCapsule(p, tail, noseTip, 0.26 * fade);
    dens *= mix(1.0, smoothstep(-0.05, 0.12, dBow), fade);
  }
  return vec2(max(dens, 0.0), heat);
}

// Henyey-Greenstein-ish scattering lobe (g in [-0.85, 0.85]).
float hgPhase(float cosT, float g) {
  float gg = g * g;
  float denom = 1.0 + gg - 2.0 * g * cosT;
  return (1.0 - gg) / pow(max(denom, 0.001), 1.5);
}

// Analytic ray / bounding-sphere intersect (center = origin).
vec2 intersectSmokeBounds(vec3 ro, vec3 rd, float Rb) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - Rb * Rb;
  float h = b * b - c;
  if (h < 0.0) {
    return vec2(-1.0);
  }
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

// Procedural star field: sparse magnitude-weighted cells, night only.
// Density ~0.8% of cells carry a star (a few thousand across the sky,
// few bright / many dim like the real sky). Twinkle uses integer loop
// cycles so the 8 s loop stays seamless.
vec3 starField(vec3 d, float phase, float nightF) {
  if (d.y < 0.05 || nightF <= 0.0) {
    return vec3(0.0);
  }
  vec2 sp = d.xz / max(d.y, 0.08) * 60.0;
  vec2 cell = floor(sp);
  vec2 pos = fract(sp) - 0.5;
  float h = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
  if (h < 0.992) {
    return vec3(0.0);
  }
  vec2 off = vec2(
    fract(sin(dot(cell, vec2(269.5, 183.3))) * 43758.5453),
    fract(sin(dot(cell, vec2(113.5, 271.9))) * 43758.5453)) - 0.5;
  float dist = length(pos - off * 0.7);
  float mag = pow(fract(h * 57.0), 12.0);
  float tw = 0.75 + 0.25 * sin(phase * TAU * 6.0 + h * 40.0);
  float star = smoothstep(0.08, 0.0, dist) * (0.15 + mag) * tw;
  return vec3(0.9, 0.95, 1.0) * star * nightF;
}

// Physical-ish sky: day/dusk/night blend from sun elevation, sun disc +
// flare, stars at night. uLightDirection IS the sun (set CPU-side from
// azimuth/elevation). Every reflection/refraction in the scene resolves
// through this function, so they all see the same sky.
vec3 backgroundColor(vec3 d, float phase) {
  vec3 sd = normalize(uLightDirection);
  float dayF = smoothstep(-0.10, 0.25, sd.y);   // 0 night -> 1 day
  float nightF = 1.0 - dayF;
  float cb = sd.y * 4.0;
  float duskF = exp(-cb * cb);                  // band around horizon sun
  vec3 zen = mix(vec3(0.008, 0.012, 0.03), uSkyColor * 0.55, dayF);
  vec3 hor = mix(vec3(0.02, 0.03, 0.07),
    mix(vec3(0.65, 0.75, 0.9), uSkyColor, 0.35), dayF);
  float h = clamp(d.y, -1.0, 1.0);
  float grad = pow(clamp(h * 0.5 + 0.5, 0.0, 1.0), 1.4);
  float sunAmt = max(dot(d, sd), 0.0);
  vec3 col = mix(hor, zen, grad)
    + uSunColor * duskF * pow(sunAmt * 0.5 + 0.5, 3.0) * 0.6;
  // Sun disc + flare, gone once the sun sinks past the horizon.
  float sunUp = smoothstep(-0.12, 0.05, sd.y);
  float disc = smoothstep(0.9996, 0.99985, sunAmt);
  float glow = pow(sunAmt, 600.0) * 1.2 + pow(sunAmt, 24.0) * 0.25;
  col += uSunColor * (disc * 3.0 + glow * uFlare) * sunUp;
  // Below horizon: dark ground haze.
  col = mix(col, hor * 0.35, 1.0 - smoothstep(-0.25, 0.0, h));
  // Stars take over at night.
  col += starField(d, phase, nightF * smoothstep(0.02, 0.25, h));
  return col;
}

// Front-to-back volume integration between t0 and t1.
// Returns vec4(rgb, transmittance); heatOD gathers the hot-air column
// (drives the background shimmer after the march).
vec4 marchSmoke(vec3 ro, vec3 rd, float t0, float t1,
    float phase, float fade, float bx, float coneOX, float baseR, float gg,
    inout float heatOD, inout float hitB) {
  vec3 lightDir = normalize(uLightDirection);
  float phaseF = hgPhase(dot(rd, lightDir), gg);
  float dt = (t1 - t0) / float(VOL_STEPS);
  float t = t0 + dt * hash12(gl_FragCoord.xy);
  vec3 col = vec3(0.0);
  float trans = 1.0;
  for (int i = 0; i < VOL_STEPS; ++i) {
    if (t > t1) {
      break;
    }
    vec3 p = ro + rd * t;
    if (bulletSDF(p, bx, fade) < -0.01) {
      hitB = 1.0;  // solid bullet inside the volume kills the ray
      trans = 0.0;
      break;
    }
    float dCone = coneField(p, phase, fade, coneOX, baseR);
    vec2 dh = smokeDensityAt(p, phase, dCone, fade, coneOX);
    float dens = dh.x;
    float heat = dh.y;
    heatOD += heat * trans * dt;
    if (dens > 0.001) {
      float a = 1.0 - exp(-dens * uSmokeDensity * dt);
      vec3 scatter = uSmokeColor * (0.22 + 0.45 * dens)
        + uLightColor * phaseF * uScatter
        + uHeatColor * (heat * uHeatStrength * 2.0);
      col += trans * scatter * a;
      trans *= 1.0 - a;
      if (trans < 0.02) {
        trans = 0.0;
        break;
      }
    }
    // Hot air itself glows even where the smoke runs thin.
    col += trans * uHeatColor * (heat * uHeatStrength * 0.35) * dt;
    t += dt;
  }
  return vec4(col, trans);
}

// Blue -> cyan -> green -> yellow -> red field ramp for debug views.
vec3 debugRamp(float v) {
  v = clamp(v, 0.0, 1.0);
  vec3 c = mix(vec3(0.05, 0.1, 0.5), vec3(0.0, 0.8, 1.0), smoothstep(0.0, 0.35, v));
  c = mix(c, vec3(0.1, 0.9, 0.3), smoothstep(0.35, 0.6, v));
  c = mix(c, vec3(1.0, 0.85, 0.1), smoothstep(0.6, 0.8, v));
  return mix(c, vec3(1.0, 0.1, 0.1), smoothstep(0.8, 1.0, v));
}

// Debug field view through the smoke bounds: peak value along the ray.
// 1 = air compression, 2 = heat, 3 = density, 4 = cone SDF.
vec3 debugMarch(vec3 ro, vec3 rd, float t0, float t1,
    float phase, float fade, float coneOX, float baseR) {
  float dt = (t1 - t0) / float(VOL_STEPS);
  float t = t0;
  float acc = 0.0;
  for (int i = 0; i < VOL_STEPS; ++i) {
    if (t > t1) {
      break;
    }
    vec3 p = ro + rd * t;
    float dCone = coneField(p, phase, fade, coneOX, baseR);
    float v;
    if (uDebugMode < 1.5) {
      // Same compression model as smokeDensityAt (keep in sync).
      float sb = (dCone - 0.12) * 9.0;
      float shell = (fade > 0.0) ? exp(-sb * sb) * fade : 0.0;
      float stag = 0.0;
      if (fade > 0.0) {
        float sAhead = p.x - (coneOX + 0.19);
        if (sAhead > -0.1) {
          float sa = sAhead / 0.35;
          float sr = length(p.yz) / 0.30;
          stag = exp(-(sa * sa + sr * sr)) * fade * smoothstep(-0.1, 0.15, sAhead);
        }
      }
      float coreRare = (1.0 - smoothstep(-0.35, 0.05, dCone)) * fade;
      v = (shell * 1.2 + stag * 0.8 - coreRare * 0.9 + 1.0) / 2.5;
    } else if (uDebugMode < 2.5) {
      v = smokeDensityAt(p, phase, dCone, fade, coneOX).y;
    } else if (uDebugMode < 3.5) {
      v = smokeDensityAt(p, phase, dCone, fade, coneOX).x / 1.5;
    } else {
      v = (dCone + 1.0) * 0.5;
    }
    acc = max(acc, v);
    t += dt;
  }
  return debugRamp(acc);
}

void main() {
  float phase;
  float fade;
  float bx;
  float coneOX;
  float baseR;
  loopState(phase, fade, bx, coneOX, baseR);
  float gg = clamp(uAnisotropy, -0.85, 0.85);

  // --- Build camera basis ---
  vec3 forward = normalize(uCameraForward);
  vec3 right = normalize(cross(forward, uCameraUp));
  vec3 camUp = cross(right, forward);

  // --- Per-pixel ray direction ---
  vec2 uv = vec2(vNdc.x * uAspectRatio, vNdc.y);
  float tanHalfFov = tan(radians(uCameraFov * 0.5));
  vec3 rayOrigin = uCameraPosition;
  vec3 rayDirection = normalize(
    uv.x * tanHalfFov * right +
    uv.y * tanHalfFov * camUp +
    forward
  );

  // --- Opaque march: bullet sphere + perturbed ground slab ---
  // Depth fix: displaced SDF overestimates distance, so a relaxed step can
  // jump OVER the thin slab (tunneling -> smoke renders through the plane).
  // Relax harder with amplitude AND cap near-field steps below the slab
  // thickness; far field keeps full steps.
  float relaxO = 1.0 - 0.6 * clamp(uGroundAmp * 10.0, 0.0, 1.0);
  // Spawn puts the bullet center exactly on the surface: impact at t = 0.
  // Debris motion capped at 6.3 s (all validity bounds hold), then held
  // while smoke and loop continue to 16 s.
  float tSince = min(phase * LOOP_DURATION, 6.3);
  float tb = uMaxDistance;
  bool opaqueHit = false;
  float hitMat = 0.0;
  vec3 hitPos = vec3(0.0);
  float t = 0.0;
  float prevD = 1e5;
  float prevT = 0.0;
  for (int i = 0; i < MAX_STEPS; ++i) {
    vec3 p = rayOrigin + rayDirection * t;
    vec2 s = opaqueScene(p, rayOrigin, bx, fade, tSince);
    // Hit only when approaching from outside (prevD > 0): a bare d < eps
    // test also fires deep inside hollow regions (gaps capped with noise,
    // banded stop depths). Crossings bracket + bisect to the true wall.
    if (s.x < uEpsilon && prevD > 0.0) {
      if (s.x < 0.0) {
        float ta = prevT;
        float tb2 = t;
        float da = prevD;
        for (int k = 0; k < 6; ++k) {
          float tm = 0.5 * (ta + tb2);
          float dm = opaqueScene(rayOrigin + rayDirection * tm, rayOrigin, bx, fade, tSince).x;
          if ((dm < 0.0) == (da < 0.0)) {
            ta = tm;
            da = dm;
          } else {
            tb2 = tm;
          }
        }
        t = 0.5 * (ta + tb2);
        vec2 sh = opaqueScene(rayOrigin + rayDirection * t, rayOrigin, bx, fade, tSince);
        opaqueHit = true;
        hitMat = sh.y;
        hitPos = rayOrigin + rayDirection * t;
        tb = t;
      } else {
        opaqueHit = true;
        hitMat = s.y;
        hitPos = p;
        tb = t;
      }
      break;
    }
    prevD = s.x;
    prevT = t;
    // abs(): inside, |d| still bounds the forward distance (never step back).
    float stepO = abs(s.x) * relaxO;
    if (abs(s.x) < 1.0) {
      // Tighter cap once shattered: chunk borders are discontinuous, and big
      // steps across them leak rays (flicker / phantom bridges between pieces).
      float nearCap = (uMode > 0.5 && tSince > 0.001) ? 0.12 : 0.3;
      stepO = min(stepO, nearCap); // never jump the thin slab near a surface
    }
    t += stepO;
    if (t > uMaxDistance) {
      break;
    }
  }

  // --- Volume march (cloud mode only; sphere mode has no smoke) ---
  float Rb = uSmokeRadius * 1.35 + uNoiseAmplitude + 0.3;
  vec2 bounds = intersectSmokeBounds(rayOrigin, rayDirection, Rb);
  float heatOD = 0.0;
  float dummyHit = 0.0;
  vec4 vol = vec4(0.0, 0.0, 0.0, 1.0);
  if (uMode < 0.5 && (bounds.x >= 0.0 || bounds.y > 0.0)) {
    float t0 = max(bounds.x, 0.0);
    float t1 = min(bounds.y, opaqueHit ? tb : bounds.y);
    if (t1 > t0) {
      vol = marchSmoke(rayOrigin, rayDirection, t0, t1,
        phase, fade, bx, coneOX, baseR, gg, heatOD, dummyHit);
    }
  }

  // --- Heat shimmer: hot-air column wobbles the background lookup ---
  float heatN = clamp(heatOD * 2.5, 0.0, 1.0);
  float shimmer = 0.10 * uHeatStrength * heatN;
  vec2 suv = vNdc * 3.0;
  vec2 shim = vec2(
    cnoise(vec3(suv * 2.0, phase * TAU * 2.0)),
    cnoise(vec3(suv * 2.0 + vec2(13.7, 7.1), phase * TAU * 2.0))) * 0.5;
  vec3 bgDir = normalize(rayDirection + (right * shim.x + camUp * shim.y) * shimmer);
  vec3 bg = backgroundColor(bgDir, phase);

  vec3 color;
  if (uDebugMode > 0.5) {
    // Debug field view through the smoke bounds (opaque = dark silhouette).
    color = vec3(0.015, 0.02, 0.04);
    if (bounds.x >= 0.0 || bounds.y > 0.0) {
      float t0 = max(bounds.x, 0.0);
      if (bounds.y > t0) {
        color = debugMarch(rayOrigin, rayDirection, t0, bounds.y,
          phase, fade, coneOX, baseR);
      }
    }
    if (opaqueHit) {
      color *= 0.2;
    }
  } else {
    color = vol.rgb + vol.a * bg;
  }

  // NOTE: no tb-vs-bounds gate on purpose. The volume already stops at
  // min(tb, bounds), so an opaque hit anywhere composites correctly over it.
  // Gating on tb <= bounds.y dropped far hits (outer plane, distant bullet).
  if (uDebugMode < 0.5 && opaqueHit) {
    vec3 lightDir = normalize(uLightDirection);
    if (hitMat < 1.5) {
      // --- Bullet shading over the smoke ---
      const float h = 0.0005;
      vec3 n = normalize(vec3(
        bulletSDF(hitPos + vec3(h, 0.0, 0.0), bx, fade) - bulletSDF(hitPos - vec3(h, 0.0, 0.0), bx, fade),
        bulletSDF(hitPos + vec3(0.0, h, 0.0), bx, fade) - bulletSDF(hitPos - vec3(0.0, h, 0.0), bx, fade),
        bulletSDF(hitPos + vec3(0.0, 0.0, h), bx, fade) - bulletSDF(hitPos - vec3(0.0, 0.0, h), bx, fade)));
      vec3 hvec = normalize(lightDir - rayDirection + vec3(1e-4));
      float diffuseFactor = max(dot(n, lightDir), 0.0);
      float spec = pow(max(dot(n, hvec), 0.0), 90.0);
      float rim = pow(1.0 - clamp(dot(-rayDirection, n), 0.0, 1.0), 3.0);
      vec3 bulletCol = vec3(0.035, 0.04, 0.05)
        + vec3(0.45, 0.5, 0.6) * diffuseFactor * 0.7 * uLightIntensity
        + uLightColor * spec * 1.5
        + uHeatColor * rim * 0.4;
      color = vol.rgb + vol.a * bulletCol;
    } else if (hitMat < 2.5) {
      // --- Ground slab: diffuse + traced smoke reflection + thin-slab refraction ---
      vec3 n = groundNormal(hitPos, rayOrigin);
      float cosT = clamp(dot(-rayDirection, n), 0.0, 1.0);
      float diff = clamp(dot(n, lightDir) * 0.5 + 0.5, 0.0, 1.0);
      vec3 hvec = normalize(lightDir - rayDirection + vec3(1e-4));
      float spec = pow(max(dot(n, hvec), 0.0), 60.0);
      vec3 base = vec3(0.14, 0.16, 0.20) * (0.25 + 0.75 * diff) * uLightIntensity;
      // Reflection ray: march it through the smoke volume.
      vec3 R = reflect(rayDirection, n);
      vec3 roR = hitPos + R * 0.02;
      vec2 rb = intersectSmokeBounds(roR, R, Rb);
      vec3 reflCol = backgroundColor(R, phase);
      if (rb.x >= 0.0 || rb.y > 0.0) {
        float rt0 = max(rb.x, 0.0);
        if (rb.y > rt0) {
          float rHeat = 0.0;
          float rHitB = 0.0;
          vec4 rvol = marchSmoke(roR, R, rt0, rb.y,
            phase, fade, bx, coneOX, baseR, gg, rHeat, rHitB);
          reflCol = rvol.rgb + rvol.a * backgroundColor(R, phase);
          reflCol = mix(reflCol, vec3(0.03, 0.032, 0.04), rHitB);
        }
      }
      // Refraction through the thin slab: bend in, traverse, bend out.
      vec3 refr = refract(rayDirection, n, 1.0 / SLAB_IOR);
      vec3 refrOut = refract(refr, -n, SLAB_IOR);
      if (dot(refrOut, refrOut) < 0.001) {
        refrOut = refr; // grazing total internal reflection: keep inner dir
      }
      float trav = (2.0 * GROUND_HALF.y) / max(dot(-refr, n), 0.25);
      vec3 transCol = backgroundColor(refrOut, phase)
        * exp(-trav * 1.2) * vec3(0.5, 0.6, 0.75);
      float fres = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
      color = base + uLightColor * spec * 0.5
        + fres * reflCol + (1.0 - fres) * transCol * 0.55;
    } else {
      // --- Plastic red sphere: dielectric shading + voronoi crack lines ---
      // hitBorder must come from the exact hit point: the bisect taps above
      // overwrote the handoff with bracket interiors, so re-evaluate once
      // (return discarded) before the normal taps below overwrite it again.
      sphereShatterSDF(hitPos, tSince);
      float hitBorder = gBorderW;
      const float h = 0.003;
      vec3 n = normalize(vec3(
        sphereShatterSDF(hitPos + vec3(h, 0.0, 0.0), tSince) - sphereShatterSDF(hitPos - vec3(h, 0.0, 0.0), tSince),
        sphereShatterSDF(hitPos + vec3(0.0, h, 0.0), tSince) - sphereShatterSDF(hitPos - vec3(0.0, h, 0.0), tSince),
        sphereShatterSDF(hitPos + vec3(0.0, 0.0, h), tSince) - sphereShatterSDF(hitPos - vec3(0.0, 0.0, h), tSince)));
      vec3 albedo = vec3(0.62, 0.03, 0.04);
      float diffuseFactor = max(dot(n, lightDir), 0.0);
      vec3 hvec = normalize(lightDir - rayDirection + vec3(1e-4));
      float ndh = max(dot(n, hvec), 0.0);
      float spec = pow(ndh, 120.0);
      float clear = pow(ndh, 900.0);
      float fresS = pow(1.0 - clamp(dot(-rayDirection, n), 0.0, 1.0), 5.0);
      vec3 scol = albedo * (0.12 + diffuseFactor) * uLightColor * uLightIntensity
        + vec3(1.0) * spec * 1.1
        + vec3(1.0) * clear * 2.0
        + albedo * fresS * 0.6;
      // Dark crack lines along the moved partition borders.
      float crack = (1.0 - smoothstep(0.0, max(gapHalfWidth(tSince, shardFreqAt(hitPos)) * 1.5, 0.004), hitBorder))
        * clamp(tSince * 2.0, 0.0, 1.0);
      scol *= 1.0 - crack * 0.8;
      color = vol.rgb + vol.a * scol;
    }
  }

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
