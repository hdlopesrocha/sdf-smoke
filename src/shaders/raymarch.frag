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
//   - Opaque march: bullet sphere SDF only.
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
uniform float uNoiseSpeed;      // billow flow speed (loop-safe multi-harmonic churn)

// --- Shockwave cone uniforms (uConeAngleDeg = FULL apex angle) ---
uniform float uConeAngleDeg;
uniform float uConeLength;     // shock-cone wake length behind the bullet
uniform float uPush;           // shock displacement: 0 = carve only, higher piles a compression shell

// --- Compression turbulence uniforms ---
uniform float uRippleAmp;      // turbulence strength on smoke near the cone
uniform float uRippleFreq;     // spatial frequency of the turbulence

// --- Raymarch tuning ---
uniform float uEpsilon;      // opaque surface hit threshold
uniform float uMaxDistance;  // far raymarch limit (camera "far")

// --- Directional light uniforms ---
// uLightDirection: direction FROM the surface TOWARD the light (already normalized on CPU).
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform float uLightIntensity;

// --- Animation / misc ---
uniform float uTime;        // elapsed seconds (looped internally every 8 s)
uniform vec2 uResolution;   // drawing-buffer size in pixels (reserved)

// Constants (LOOP_DURATION must match LOOP_SECONDS in RaymarchCanvas.vue).
const int MAX_STEPS = 64;
const int VOL_STEPS = 32;
const int MAX_OCTAVES = 8;
const float LOOP_DURATION = 8.0;
const float TAU = 6.2831853;
const float BULLET_X0 = -3.2;
const float BULLET_X1 = 3.2;
const float BULLET_RADIUS = 0.14;
const vec3 SMOKE_CENTER = vec3(0.0, 0.0, 0.0);
const vec3 BACKGROUND_TOP = vec3(0.12, 0.18, 0.32);
const vec3 BACKGROUND_BOTTOM = vec3(0.02, 0.02, 0.05);

float sdSphere(vec3 p, float r) {
  return length(p) - r;
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

// --- 8-second loop helpers ---
// All animation derives from the loop phase with INTEGER cycle counts or a
// circular domain offset, so the last frame wraps seamlessly to the first.
float loopPhase() {
  return fract(uTime / LOOP_DURATION);
}

// 3D domain flow: continuous at the wrap, churns the billows in depth too.
// Higher harmonics fade in with uNoiseSpeed, so the slider genuinely
// adjusts the flow speed while every term stays an integer cycle per loop.
vec3 smokeWobble(float phase) {
  float a1 = phase * TAU;
  float a2 = a1 * 2.0;
  float a3 = a1 * 3.0;
  float s = uNoiseSpeed;
  return vec3(cos(a1), sin(a1), 0.6 * sin(a1 + 2.1)) * (0.10 + 0.25 * s)
    + vec3(cos(a2 + 0.7), sin(a2 + 1.9), cos(a2 + 3.1)) * (0.22 * s)
    + vec3(sin(a3 + 2.2), cos(a3 + 0.4), sin(a3 + 1.1)) * (0.12 * s);
}

float bulletX(float phase) {
  return mix(BULLET_X0, BULLET_X1, phase);
}

// Shrinks bullet + heat cone to nothing at the wrap so the jump stays invisible.
float endFade(float phase) {
  return smoothstep(0.0, 0.03, phase) * (1.0 - smoothstep(0.97, 1.0, phase));
}

void loopState(out float phase, out float fade, out float bx, out float coneOX, out float baseR) {
  phase = loopPhase();
  fade = endFade(phase);
  bx = bulletX(phase);
  coneOX = bx - 0.05;
  baseR = uConeLength * tan(radians(uConeAngleDeg * 0.5));
}

// Opaque scene: the bullet sphere is the ONLY solid surface.
float bulletSDF(vec3 p, float bx, float fade) {
  return sdSphere(p - vec3(bx, 0.0, 0.0), BULLET_RADIUS * fade);
}

// Distorted shock-cone SDF: base cone + animated compression ripple.
// Integer phase cycles keep the ripple loop-safe.
float coneField(vec3 p, float phase, float fade, float coneOX, float baseR) {
  vec3 coneP = vec3(p.y, coneOX - p.x, p.z);
  float d = sdRoundCone(coneP, 0.03 * fade, baseR * fade, uConeLength);
  float apexW = clamp(1.0 - (coneOX - p.x) / uConeLength, 0.0, 1.0);
  vec3 rq = p * uRippleFreq + vec3(phase * TAU * 2.0, phase * TAU * 3.0, 0.0);
  return d + cnoise(rq) * uRippleAmp * (0.35 + 0.65 * apexW) * fade;
}

// Smoke density 0..~1: soft ball falloff shaped by fbm billows,
// with the distorted shock cone SUBTRACTED (carved tunnel, rippled walls)
// and the density adapted to air compression (shock shell squeeze,
// core rarefaction, nose stagnation). Returns vec2(density, heat).
vec2 smokeDensityAt(vec3 p, float phase, vec3 wob, float dCone, float fade, float coneOX) {
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
  vec3 q = (p - SMOKE_CENTER + rdir * (pushBand * uPush * 0.6)) * uNoiseFrequency + wob;
  float f = fbm(q, uNoiseOctaves, uLacunarity, uNoiseGain);
  float filament = smoothstep(-0.25, 0.65, f);
  float dens = pow(fall, 1.5) * mix(0.25, 1.0, filament);
  // Billow erosion chews the silhouette.
  dens *= smoothstep(0.0, 0.45, fall + f * uNoiseAmplitude);
  // Hot air expands: thinner smoke, rippled by compression turbulence.
  if (heat > 0.01) {
    vec3 rq = p * uRippleFreq + vec3(phase * TAU * 2.0, phase * TAU * 3.0, 0.0);
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

vec3 backgroundColor(vec3 d) {
  float g = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(BACKGROUND_BOTTOM, BACKGROUND_TOP, g);
  float sun = pow(clamp(dot(d, normalize(uLightDirection)), 0.0, 1.0), 250.0);
  col += uLightColor * sun * 1.5;
  return col;
}

// Front-to-back volume integration between t0 and t1.
// Returns vec4(rgb, transmittance); heatOD gathers the hot-air column
// (drives the background shimmer after the march).
vec4 marchSmoke(vec3 ro, vec3 rd, float t0, float t1, vec3 wob,
    float phase, float fade, float coneOX, float baseR, float gg,
    inout float heatOD) {
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
    float dCone = coneField(p, phase, fade, coneOX, baseR);
    vec2 dh = smokeDensityAt(p, phase, wob, dCone, fade, coneOX);
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

void main() {
  float phase;
  float fade;
  float bx;
  float coneOX;
  float baseR;
  loopState(phase, fade, bx, coneOX, baseR);
  vec3 wob = smokeWobble(phase);
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

  // --- Opaque march: bullet sphere only ---
  float tb = uMaxDistance;
  bool bulletHit = false;
  vec3 bulletPos = vec3(0.0);
  float t = 0.0;
  for (int i = 0; i < MAX_STEPS; ++i) {
    vec3 p = rayOrigin + rayDirection * t;
    float d = bulletSDF(p, bx, fade);
    if (d < uEpsilon) {
      bulletHit = true;
      bulletPos = p;
      tb = t;
      break;
    }
    t += d;
    if (t > uMaxDistance) {
      break;
    }
  }

  // --- Volume march through the smoke bounds (stops at the bullet) ---
  float Rb = uSmokeRadius * 1.35 + uNoiseAmplitude + 0.3;
  vec2 bounds = intersectSmokeBounds(rayOrigin, rayDirection, Rb);
  float heatOD = 0.0;
  vec4 vol = vec4(0.0, 0.0, 0.0, 1.0);
  if (bounds.x >= 0.0 || bounds.y > 0.0) {
    float t0 = max(bounds.x, 0.0);
    float t1 = min(bounds.y, bulletHit ? tb : bounds.y);
    if (t1 > t0) {
      vol = marchSmoke(rayOrigin, rayDirection, t0, t1, wob,
        phase, fade, coneOX, baseR, gg, heatOD);
    }
  }

  // --- Heat shimmer: hot-air column wobbles the background lookup ---
  float heatN = clamp(heatOD * 2.5, 0.0, 1.0);
  float shimmer = 0.10 * uHeatStrength * heatN;
  vec2 suv = vNdc * 3.0;
  vec2 shim = vec2(
    cnoise(vec3(suv * 2.0, phase * TAU)),
    cnoise(vec3(suv * 2.0 + vec2(13.7, 7.1), phase * TAU))) * 0.5;
  vec3 bgDir = normalize(rayDirection + (right * shim.x + camUp * shim.y) * shimmer);
  vec3 bg = backgroundColor(bgDir);

  vec3 color = vol.rgb + vol.a * bg;

  // --- Bullet shading over the smoke ---
  if (bulletHit && tb <= bounds.y + 0.001) {
    const float h = 0.0005;
    vec3 n = normalize(vec3(
      bulletSDF(bulletPos + vec3(h, 0.0, 0.0), bx, fade) - bulletSDF(bulletPos - vec3(h, 0.0, 0.0), bx, fade),
      bulletSDF(bulletPos + vec3(0.0, h, 0.0), bx, fade) - bulletSDF(bulletPos - vec3(0.0, h, 0.0), bx, fade),
      bulletSDF(bulletPos + vec3(0.0, 0.0, h), bx, fade) - bulletSDF(bulletPos - vec3(0.0, 0.0, h), bx, fade)));
    vec3 lightDir = normalize(uLightDirection);
    vec3 hvec = normalize(lightDir - rayDirection);
    float diffuseFactor = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(n, hvec), 0.0), 90.0);
    float rim = pow(1.0 - clamp(dot(-rayDirection, n), 0.0, 1.0), 3.0);
    vec3 bulletCol = vec3(0.035, 0.04, 0.05)
      + vec3(0.45, 0.5, 0.6) * diffuseFactor * 0.7 * uLightIntensity
      + uLightColor * spec * 1.5
      + uHeatColor * rim * 0.4;
    color = vol.rgb + vol.a * bulletCol;
  }

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
