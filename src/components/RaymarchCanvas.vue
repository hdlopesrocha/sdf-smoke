<template>
  <div class="raymarch-container">
    <canvas ref="canvasRef" class="raymarch-canvas"></canvas>

    <!-- Minimal debug / info UI. Values mirror the uniforms below;
         structured so they can become interactive controls later. -->
    <div class="hud">
      <div class="hud-title">Smoke + Shockwave</div>
      <div class="loop-track"><div ref="loopBarRef" class="loop-fill"></div></div>
      <div class="hud-row"><span>March steps</span><code>{{ config.maxSteps }}</code></div>
      <div class="hud-row"><span>Frame</span><code ref="frameMsEl">-- ms · -- fps</code></div>
      <div class="hud-row"><span>Camera pos</span><code ref="camPosEl">[0.00, 0.00, 5.00]</code></div>
      <div class="hud-row hud-hint"><span>Drag / WASD orbit · wheel zoom</span></div>
      <div class="hud-row"><span>Sun</span><code>{{ config.sunAzimuth.toFixed(0) }}° / {{ config.sunElevation.toFixed(0) }}°</code></div>
      <div class="hud-row"><span>Loop</span><code ref="phaseEl">0.0s / 16s</code></div>
      <div v-if="error" class="hud-error">{{ error }}</div>
    </div>

    <!-- Live controls (bound directly to shader uniforms). -->
    <div class="controls">
      <div class="controls-title">Shape</div>
      <label class="ctl">
        <span>Shape</span>
        <select v-model="config.mode" class="debug-select">
          <option value="cloud">Cloud</option>
          <option value="sphere">Sphere</option>
          <option value="cube">Cube</option>
        </select>
      </label>
      <label class="ctl">
        <span>Size <code>{{ config.size.toFixed(2) }}</code></span>
        <input type="range" min="1" max="2.5" step="0.05" v-model.number="config.size" />
      </label>
      <label class="ctl">
        <span>Yaw <code>{{ config.shapeYaw.toFixed(0) }}°</code></span>
        <input type="range" min="-180" max="180" step="1" v-model.number="config.shapeYaw" />
      </label>
      <label class="ctl">
        <span>Pitch <code>{{ config.shapePitch.toFixed(0) }}°</code></span>
        <input type="range" min="-180" max="180" step="1" v-model.number="config.shapePitch" />
      </label>
      <label class="ctl">
        <span>Roll <code>{{ config.shapeRoll.toFixed(0) }}°</code></span>
        <input type="range" min="-180" max="180" step="1" v-model.number="config.shapeRoll" />
      </label>
      <div class="controls-title">Bullet</div>
      <label class="ctl">
        <span>Speed <code>{{ config.bulletSpeed.toFixed(1) }}</code></span>
        <input type="range" min="0.5" max="8" step="0.1" v-model.number="config.bulletSpeed" />
      </label>
      <div v-if="config.mode === 'cloud'">
      <div class="controls-title">Smoke</div>
      <label class="ctl">
        <span>Density <code>{{ config.smokeDensity.toFixed(2) }}</code></span>
        <input type="range" min="0" max="2" step="0.05" v-model.number="config.smokeDensity" />
      </label>
      <!-- size moved to the Shape section above -->
      <label class="ctl">
        <span>Billow <code>{{ config.noiseAmplitude.toFixed(2) }}</code></span>
        <input type="range" min="0" max="0.8" step="0.01" v-model.number="config.noiseAmplitude" />
      </label>
      <label class="ctl">
        <span>Frequency <code>{{ config.noiseFrequency.toFixed(2) }}</code></span>
        <input type="range" min="0.5" max="4" step="0.05" v-model.number="config.noiseFrequency" />
      </label>
      <label class="ctl">
        <span>Period <code>{{ smokePeriod.toFixed(2) }}</code></span>
        <input type="range" min="0.25" max="2" step="0.05" v-model.number="smokePeriod" />
      </label>
      <label class="ctl">
        <span>Octaves <code>{{ config.noiseOctaves }}</code></span>
        <input type="range" min="1" max="8" step="1" v-model.number="config.noiseOctaves" />
      </label>
      <label class="ctl">
        <span>Lacunarity <code>{{ config.noiseLacunarity.toFixed(2) }}</code></span>
        <input type="range" min="1.5" max="4" step="0.05" v-model.number="config.noiseLacunarity" />
      </label>
      <label class="ctl">
        <span>Gain <code>{{ config.noiseGain.toFixed(2) }}</code></span>
        <input type="range" min="0.2" max="0.8" step="0.01" v-model.number="config.noiseGain" />
      </label>
      <label class="ctl">
        <span>Flow speed <code>{{ config.noiseSpeed.toFixed(2) }}</code></span>
        <input type="range" min="0" max="1.5" step="0.05" v-model.number="config.noiseSpeed" />
      </label>
      </div>
      <div class="controls-title">Shockwave</div>
      <label class="ctl">
        <span>Cone angle <code>{{ config.coneAngle.toFixed(1) }}°</code></span>
        <input type="range" min="10" max="35" step="0.5" v-model.number="config.coneAngle" />
      </label>
      <label class="ctl">
        <span>Cone length <code>{{ config.coneLength.toFixed(2) }}</code></span>
        <input type="range" min="1.5" max="3.5" step="0.1" v-model.number="config.coneLength" />
      </label>
      <label class="ctl">
        <span>Ripple amp <code>{{ config.rippleAmp.toFixed(3) }}</code></span>
        <input type="range" min="0" max="0.15" step="0.005" v-model.number="config.rippleAmp" />
      </label>
      <label class="ctl">
        <span>Ripple freq <code>{{ config.rippleFreq.toFixed(1) }}</code></span>
        <input type="range" min="2" max="20" step="0.5" v-model.number="config.rippleFreq" />
      </label>
      <label class="ctl">
        <span>Shock push <code>{{ config.push.toFixed(2) }}</code></span>
        <input type="range" min="0" max="1.5" step="0.05" v-model.number="config.push" />
      </label>
      <div class="controls-title">Ground</div>
      <label class="ctl ctl-check">
        <span>Visible <input type="checkbox" v-model="config.showGround" /></span>
      </label>
      <label class="ctl">
        <span>Perturb amp <code>{{ config.groundAmp.toFixed(3) }}</code></span>
        <input type="range" min="0" max="0.3" step="0.005" v-model.number="config.groundAmp" />
      </label>
      <label class="ctl">
        <span>Period <code>{{ config.groundPeriod.toFixed(2) }}</code></span>
        <input type="range" min="0.25" max="4" step="0.05" v-model.number="config.groundPeriod" />
      </label>
      <label class="ctl">
        <span>Octaves <code>{{ config.groundOct }}</code></span>
        <input type="range" min="1" max="8" step="1" v-model.number="config.groundOct" />
      </label>
      <label class="ctl">
        <span>Lacunarity <code>{{ config.groundLac.toFixed(2) }}</code></span>
        <input type="range" min="1.5" max="4" step="0.05" v-model.number="config.groundLac" />
      </label>
      <div class="controls-title">Debug</div>
      <label class="ctl">
        <span>Field view</span>
        <select v-model="config.debugMode" class="debug-select">
          <option value="off">Off</option>
          <option value="compression">Air compression</option>
          <option value="heat">Heat</option>
          <option value="density">Density</option>
          <option value="cone">Cone SDF</option>
        </select>
      </label>
      <div class="controls-title">Shatter</div>
      <div class="controls-note" v-if="config.mode === 'cloud'">Switch to a solid mode above.</div>
      <label class="ctl" v-if="config.mode !== 'cloud'">
        <span>Min shard <code>{{ config.shardMin.toFixed(2) }}</code></span>
        <input type="range" min="0.02" max="0.5" step="0.01" v-model.number="config.shardMin" />
      </label>
      <div class="controls-title">Sky &amp; sun</div>
      <label class="ctl">
        <span>Azimuth <code>{{ config.sunAzimuth.toFixed(0) }}°</code></span>
        <input type="range" min="0" max="360" step="1" v-model.number="config.sunAzimuth" />
      </label>
      <label class="ctl">
        <span>Elevation <code>{{ config.sunElevation.toFixed(0) }}°</code></span>
        <input type="range" min="-15" max="90" step="1" v-model.number="config.sunElevation" />
      </label>
      <label class="ctl">
        <span>Sun colour</span>
        <input type="color" v-model="config.sunColor" />
      </label>
      <label class="ctl">
        <span>Sky colour</span>
        <input type="color" v-model="config.skyColor" />
      </label>
      <label class="ctl">
        <span>Flare <code>{{ config.flare.toFixed(2) }}</code></span>
        <input type="range" min="0" max="3" step="0.05" v-model.number="config.flare" />
      </label>
      <div class="controls-title">Light &amp; heat</div>
      <label class="ctl">
        <span>Smoke colour</span>
        <input type="color" v-model="config.smokeColor" />
      </label>
      <label class="ctl">
        <span>Heat colour</span>
        <input type="color" v-model="config.heatColor" />
      </label>
      <label class="ctl">
        <span>Anisotropy <code>{{ config.anisotropy.toFixed(2) }}</code></span>
        <input type="range" min="-0.85" max="0.85" step="0.05" v-model.number="config.anisotropy" />
      </label>
      <label class="ctl">
        <span>Heat <code>{{ config.heatStrength.toFixed(2) }}</code></span>
        <input type="range" min="0" max="3" step="0.05" v-model.number="config.heatStrength" />
      </label>
      <label class="ctl">
        <span>Scatter <code>{{ config.scatter.toFixed(2) }}</code></span>
        <input type="range" min="0" max="2.5" step="0.05" v-model.number="config.scatter" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import vertSource from '../shaders/raymarch.vert?raw'
import fragSource from '../shaders/raymarch.frag?raw'

// ---------------------------------------------------------------------------
// Scene / smoke / shockwave configuration (live uniforms via sliders below).
// MARCH_STEPS lives in the shader as a const; keep maxSteps in sync.
// ---------------------------------------------------------------------------
const LOOP_SECONDS = 16.0 // must match LOOP_DURATION in the fragment shader
const config = reactive({
  maxSteps: 64,
  epsilon: 0.004,
  maxDistance: 200.0, // far raymarch cutoff (was clipping distant geometry)
  // Orbit camera, always looking at the SDF center (SMOKE_CENTER in shader).
  // A/D orbit yaw, W/S orbit pitch, Q/E dolly. Arrow keys mirror WASD.
  camYaw: -1.157, // radians (matches [-2.89, -0.13, 1.27] at dist 3.16)
  camPitch: -0.041, // radians, clamped
  camDist: 3.16, // clamped
  cameraUp: [0.0, 1.0, 0.0],
  cameraFov: 60.0,
  // Sun (single source of truth: drives the sky AND the directional light).
  sunAzimuth: 320.0, // degrees (320/46 reproduces the old [-0.5, 0.8, 0.6] light)
  sunElevation: 46.0, // degrees (-15 night .. 90 noon)
  sunColor: '#fff3e0',
  skyColor: '#4a7ec2',
  flare: 1.2,
  // Master shape size + object rotation (generic for smoke / sphere / cube).
  size: 1.7,
  shapeYaw: 0.0, // degrees
  shapePitch: 0.0,
  shapeRoll: 0.0,
  bulletSpeed: 3.2, // world units/s; drives flight + chunk motion
  smokeDensity: 2.0,
  // Perlin billows.
  noiseAmplitude: 0.8,
  noiseFrequency: 4.0,
  noiseOctaves: 4,
  noiseLacunarity: 2.0,
  noiseGain: 0.8,
  noiseSpeed: 0,
  // Bullet shockwave cone.
  coneAngle: 35.0,
  coneLength: 3.5,
  rippleAmp: 0.05,
  rippleFreq: 9.0,
  push: 1.5,
  mode: 'cloud', // 'cloud' volumetric smoke | 'sphere' plastic shatter sphere
  shardMin: 0.1, // smallest shard, world units
  // Ground slab perturbation (near-camera Perlin, far stays flat).
  groundAmp: 0.08,
  groundPeriod: 1.2,
  groundOct: 4,
  groundLac: 2.0,
  showGround: false, // plane hidden by default; toggle in Ground section
  debugMode: 'off', // off | compression | heat | density | cone
  // Light & heat.
  smokeColor: '#8ea2c8',
  heatColor: '#ff7a26',
  anisotropy: 0.3,
  heatStrength: 0,
  scatter: 1.0,
  maxDevicePixelRatio: 2.0,
})

// Smoke noise period (world units per cell) kept in sync with frequency:
// period and frequency are two views of the same uniform.
const smokePeriod = computed({
  get: () => 1 / config.noiseFrequency,
  set: (v) => {
    if (v > 0) config.noiseFrequency = 1 / v
  },
})

const canvasRef = ref(null)
const loopBarRef = ref(null)
const phaseEl = ref(null)
const camPosEl = ref(null)
const frameMsEl = ref(null)
const error = ref('')

let gl = null
let program = null
let uniformLocations = {}
let rafId = 0
let startTime = 0
let lastFrameMs = 0
// Frame pacing stats: EMA of frame ms + rolling 500 ms window for fps/worst.
let emaMs = -1
let statFrames = 0
let statWorst = 0
let statAccumMs = 0

// --- Orbit camera state -------------------------------------------------------
// config.camYaw/Pitch/Dist are the targets (mutated by keys); sm* are the
// smoothed values actually uploaded, so motion stays buttery.
const YAW_SPEED = 1.8 // rad/s
const PITCH_SPEED = 1.3 // rad/s
const DOLLY_SPEED = 4.0 // units/s
const PITCH_LIMIT = 1.2 // rad (~69 deg)
const DIST_MIN = 2.8
const DIST_MAX = 12.0
const keysDown = new Set()
let smYaw = 0
let smPitch = 0
let smDist = 5

// --- WebGL helpers ----------------------------------------------------------

function compileShader(gl, type, source, label) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    throw new Error(`${label} compilation failed:\n${log}`)
  }
  return shader
}

function createProgram(gl, vsSource, fsSource) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource, 'Vertex shader')
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource, 'Fragment shader')
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog)
    throw new Error(`Program linking failed:\n${log}`)
  }
  return prog
}

function normalize3(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1.0
  return [v[0] / len, v[1] / len, v[2] / len]
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim())
  if (!m) return [1, 1, 1]
  const v = parseInt(m[1], 16)
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255]
}

function sstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

// Sun state derived from azimuth/elevation: direction, day factor, and a
// directional light that falls near-dark at night (mirrors the shader sky).
function sunState() {
  const az = (config.sunAzimuth * Math.PI) / 180
  const el = (config.sunElevation * Math.PI) / 180
  const dir = [Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az)]
  const dayF = sstep(-0.1, 0.25, dir[1])
  const sunCol = hexToRgb(config.sunColor)
  const dim = 0.12 + 0.88 * dayF
  return {
    dir: normalize3(dir),
    dayF,
    lightColor: [sunCol[0] * dim, sunCol[1] * dim, sunCol[2] * dim],
    lightIntensity: 0.04 + 1.35 * dayF,
  }
}

// --- Sizing -----------------------------------------------------------------

function resizeCanvasToDisplaySize() {
  const canvas = canvasRef.value
  // CSS size comes from the stylesheet (full viewport); buffer size = CSS * DPR.
  const cssWidth = canvas.clientWidth || window.innerWidth
  const cssHeight = canvas.clientHeight || window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, config.maxDevicePixelRatio)

  let width = Math.floor(cssWidth * dpr)
  let height = Math.floor(cssHeight * dpr)

  // Clamp total pixels for performance (volumetric marching is heavy).
  const maxPixels = 1920 * 1080
  const pixels = width * height
  if (pixels > maxPixels) {
    const scale = Math.sqrt(maxPixels / pixels)
    width = Math.max(1, Math.floor(width * scale))
    height = Math.max(1, Math.floor(height * scale))
  }

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
  gl.viewport(0, 0, canvas.width, canvas.height)
}

// --- Uniforms ----------------------------------------------------------------

function cacheUniformLocations() {
  const names = [
    'uCameraPosition',
    'uCameraForward',
    'uCameraUp',
    'uCameraFov',
    'uAspectRatio',
    'uShapeSize',
    'uShapeYaw',
    'uShapePitch',
    'uShapeRoll',
    'uBulletSpeed',
    'uSmokeDensity',
    'uSmokeColor',
    'uScatter',
    'uAnisotropy',
    'uHeatColor',
    'uHeatStrength',
    'uNoiseAmplitude',
    'uNoiseFrequency',
    'uNoiseOctaves',
    'uLacunarity',
    'uNoiseGain',
    'uNoiseSpeed',
    'uConeAngleDeg',
    'uConeLength',
    'uPush',
    'uRippleAmp',
    'uRippleFreq',
    'uGroundAmp',
    'uGroundPeriod',
    'uGroundOct',
    'uGroundLac',
    'uMode',
    'uShardMin',
    'uShowGround',
    'uDebugMode',
    'uSunColor',
    'uSkyColor',
    'uFlare',
    'uEpsilon',
    'uMaxDistance',
    'uLightDirection',
    'uLightColor',
    'uLightIntensity',
    'uTime',
    'uResolution',
  ]
  for (const name of names) {
    // A null location just means the uniform was optimized out; not fatal.
    uniformLocations[name] = gl.getUniformLocation(program, name)
  }
}

function setStaticUniforms() {
  const u = uniformLocations
  // Camera position/forward are dynamic (orbit) — uploaded in updateCamera().
  // Sun/light are dynamic (azimuth/elevation) — uploaded in setPerFrameUniforms().
  if (u.uCameraUp) gl.uniform3fv(u.uCameraUp, config.cameraUp)
  if (u.uCameraFov) gl.uniform1f(u.uCameraFov, config.cameraFov)
  if (u.uEpsilon) gl.uniform1f(u.uEpsilon, config.epsilon)
  if (u.uMaxDistance) gl.uniform1f(u.uMaxDistance, config.maxDistance)
}

function setPerFrameUniforms(timeSeconds) {
  const canvas = canvasRef.value
  const u = uniformLocations
  if (u.uTime) gl.uniform1f(u.uTime, timeSeconds)
  if (u.uAspectRatio) gl.uniform1f(u.uAspectRatio, canvas.width / canvas.height)
  if (u.uResolution) gl.uniform2f(u.uResolution, canvas.width, canvas.height)
  // Scene uniforms are set every frame so the sliders take effect live.
  if (u.uShapeSize) gl.uniform1f(u.uShapeSize, config.size)
  if (u.uShapeYaw) gl.uniform1f(u.uShapeYaw, (config.shapeYaw * Math.PI) / 180)
  if (u.uShapePitch) gl.uniform1f(u.uShapePitch, (config.shapePitch * Math.PI) / 180)
  if (u.uShapeRoll) gl.uniform1f(u.uShapeRoll, (config.shapeRoll * Math.PI) / 180)
  if (u.uBulletSpeed) gl.uniform1f(u.uBulletSpeed, config.bulletSpeed)
  if (u.uSmokeDensity) gl.uniform1f(u.uSmokeDensity, config.smokeDensity)
  if (u.uNoiseAmplitude) gl.uniform1f(u.uNoiseAmplitude, config.noiseAmplitude)
  if (u.uNoiseFrequency) gl.uniform1f(u.uNoiseFrequency, config.noiseFrequency)
  if (u.uNoiseOctaves) {
    gl.uniform1i(u.uNoiseOctaves, Math.max(1, Math.min(8, Math.round(config.noiseOctaves))))
  }
  if (u.uLacunarity) gl.uniform1f(u.uLacunarity, config.noiseLacunarity)
  if (u.uNoiseGain) gl.uniform1f(u.uNoiseGain, config.noiseGain)
  if (u.uNoiseSpeed) gl.uniform1f(u.uNoiseSpeed, config.noiseSpeed)
  if (u.uConeAngleDeg) gl.uniform1f(u.uConeAngleDeg, config.coneAngle)
  if (u.uConeLength) gl.uniform1f(u.uConeLength, config.coneLength)
  if (u.uPush) gl.uniform1f(u.uPush, config.push)
  if (u.uGroundAmp) gl.uniform1f(u.uGroundAmp, config.groundAmp)
  if (u.uGroundPeriod) gl.uniform1f(u.uGroundPeriod, config.groundPeriod)
  if (u.uGroundOct) {
    gl.uniform1i(u.uGroundOct, Math.max(1, Math.min(8, Math.round(config.groundOct))))
  }
  if (u.uGroundLac) gl.uniform1f(u.uGroundLac, config.groundLac)
  const SHAPE_MODES = { cloud: 0, sphere: 1, cube: 2 }
  if (u.uMode) gl.uniform1f(u.uMode, SHAPE_MODES[config.mode] ?? 0)
  if (u.uShardMin) gl.uniform1f(u.uShardMin, config.shardMin)
  if (u.uShowGround) gl.uniform1f(u.uShowGround, config.showGround ? 1 : 0)
  const DEBUG_MODES = { off: 0, compression: 1, heat: 2, density: 3, cone: 4 }
  if (u.uDebugMode) gl.uniform1f(u.uDebugMode, DEBUG_MODES[config.debugMode] ?? 0)
  if (u.uRippleAmp) gl.uniform1f(u.uRippleAmp, config.rippleAmp)
  if (u.uRippleFreq) gl.uniform1f(u.uRippleFreq, config.rippleFreq)
  if (u.uSmokeColor) gl.uniform3fv(u.uSmokeColor, hexToRgb(config.smokeColor))
  if (u.uScatter) gl.uniform1f(u.uScatter, config.scatter)
  if (u.uAnisotropy) gl.uniform1f(u.uAnisotropy, config.anisotropy)
  if (u.uHeatColor) gl.uniform3fv(u.uHeatColor, hexToRgb(config.heatColor))
  if (u.uHeatStrength) gl.uniform1f(u.uHeatStrength, config.heatStrength)
  // Sun + derived directional light (near-dark at night, like the sky).
  const sun = sunState()
  if (u.uLightDirection) gl.uniform3fv(u.uLightDirection, sun.dir)
  if (u.uLightColor) gl.uniform3fv(u.uLightColor, sun.lightColor)
  if (u.uLightIntensity) gl.uniform1f(u.uLightIntensity, sun.lightIntensity)
  if (u.uSunColor) gl.uniform3fv(u.uSunColor, hexToRgb(config.sunColor))
  if (u.uSkyColor) gl.uniform3fv(u.uSkyColor, hexToRgb(config.skyColor))
  if (u.uFlare) gl.uniform1f(u.uFlare, config.flare)
}

// --- Render loop --------------------------------------------------------------

function onKeyDown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  const tag = (e.target && e.target.tagName) || ''
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  const k = e.key.toLowerCase()
  if (
    k === 'w' || k === 'a' || k === 's' || k === 'd' ||
    k === 'q' || k === 'e' || k === 'shift' ||
    k === 'arrowup' || k === 'arrowdown' || k === 'arrowleft' || k === 'arrowright'
  ) {
    keysDown.add(k)
    e.preventDefault()
  }
}

function onKeyUp(e) {
  keysDown.delete(e.key.toLowerCase())
}

// WASD/arrows orbit around the SDF center, Q/E dolly. Runs every frame.
function updateCamera(dt) {
  const boost = keysDown.has('shift') ? 2.5 : 1.0
  if (keysDown.has('a') || keysDown.has('arrowleft')) config.camYaw -= YAW_SPEED * boost * dt
  if (keysDown.has('d') || keysDown.has('arrowright')) config.camYaw += YAW_SPEED * boost * dt
  if (keysDown.has('w') || keysDown.has('arrowup')) config.camPitch += PITCH_SPEED * boost * dt
  if (keysDown.has('s') || keysDown.has('arrowdown')) config.camPitch -= PITCH_SPEED * boost * dt
  if (keysDown.has('q')) config.camDist -= DOLLY_SPEED * boost * dt
  if (keysDown.has('e')) config.camDist += DOLLY_SPEED * boost * dt
  config.camPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, config.camPitch))
  config.camDist = Math.max(DIST_MIN, Math.min(DIST_MAX, config.camDist))

  // Smooth toward the targets, then place the camera on the orbit sphere
  // around the origin (the SDF center) and aim back at it.
  const k = 1 - Math.exp(-dt * 10)
  smYaw += (config.camYaw - smYaw) * k
  smPitch += (config.camPitch - smPitch) * k
  smDist += (config.camDist - smDist) * k

  const cp = Math.cos(smPitch)
  const pos = [
    smDist * cp * Math.sin(smYaw),
    smDist * Math.sin(smPitch),
    smDist * cp * Math.cos(smYaw),
  ]
  const fwd = normalize3([-pos[0], -pos[1], -pos[2]])

  const u = uniformLocations
  if (u.uCameraPosition) gl.uniform3fv(u.uCameraPosition, pos)
  if (u.uCameraForward) gl.uniform3fv(u.uCameraForward, fwd)
  if (camPosEl.value) {
    camPosEl.value.textContent = `[${pos.map((v) => v.toFixed(2)).join(', ')}]`
  }
}

function frame(now) {
  resizeCanvasToDisplaySize()
  const elapsed = (now - startTime) / 1000.0
  const rawMs = lastFrameMs ? now - lastFrameMs : 16.7
  const dt = Math.min(0.1, rawMs / 1000 || 0.016)
  lastFrameMs = now
  // Pacing stats: EMA every frame, text readout throttled to ~2 Hz.
  emaMs = emaMs < 0 ? rawMs : emaMs + (rawMs - emaMs) * 0.08
  statFrames += 1
  statWorst = Math.max(statWorst, rawMs)
  statAccumMs += rawMs
  if (statAccumMs >= 500 && frameMsEl.value) {
    const fps = (statFrames * 1000) / statAccumMs
    frameMsEl.value.textContent =
      `${emaMs.toFixed(1)}ms · ${fps.toFixed(0)}fps · worst ${statWorst.toFixed(1)}ms`
    statFrames = 0
    statWorst = 0
    statAccumMs = 0
  }
  updateCamera(dt)
  setPerFrameUniforms(elapsed)
  // 16 s loop progress (direct DOM write to avoid re-rendering every frame).
  const loopPhase = (elapsed % LOOP_SECONDS) / LOOP_SECONDS
  if (loopBarRef.value) {
    loopBarRef.value.style.transform = `scaleX(${loopPhase})`
  }
  if (phaseEl.value) {
    phaseEl.value.textContent = `${(loopPhase * LOOP_SECONDS).toFixed(1)}s / ${LOOP_SECONDS.toFixed(0)}s`
  }
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  rafId = requestAnimationFrame(frame)
}

function onWindowResize() {
  if (gl) resizeCanvasToDisplaySize()
}

function onWindowBlur() {
  keysDown.clear() // avoid stuck keys when the window loses focus
}

// --- Pointer orbit (mouse drag + finger slide, pinch to zoom) ----------------
const activePointers = new Map() // pointerId -> { x, y }
let pinchDist = 0
const DRAG_SPEED = 0.0052 // orbit radians per pixel (matches key directions)

function onPointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return // left-drag only
  try {
    canvasRef.value.setPointerCapture(e.pointerId)
  } catch {
    // ignore: capture is best-effort (mouse already tracks the window)
  }
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (activePointers.size === 2) {
    const [a, b] = [...activePointers.values()]
    pinchDist = Math.hypot(a.x - b.x, a.y - b.y)
  }
}

function onPointerMove(e) {
  const prev = activePointers.get(e.pointerId)
  if (!prev) return
  const cur = { x: e.clientX, y: e.clientY }
  activePointers.set(e.pointerId, cur)
  if (activePointers.size === 1) {
    // Single drag/slide orbits (clamping happens in updateCamera).
    config.camYaw += (cur.x - prev.x) * DRAG_SPEED
    config.camPitch -= (cur.y - prev.y) * DRAG_SPEED
  } else if (activePointers.size === 2) {
    // Pinch zooms the dolly distance.
    const [a, b] = [...activePointers.values()]
    const d = Math.hypot(a.x - b.x, a.y - b.y)
    if (pinchDist > 0 && d > 0) {
      config.camDist = Math.max(DIST_MIN, Math.min(DIST_MAX, config.camDist * (pinchDist / d)))
    }
    pinchDist = d
  }
}

function onPointerUp(e) {
  activePointers.delete(e.pointerId)
  pinchDist = 0
}

function onWheel(e) {
  e.preventDefault()
  const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
  config.camDist = Math.max(DIST_MIN, Math.min(DIST_MAX, config.camDist * Math.exp(delta * 0.001)))
}

// --- Lifecycle ----------------------------------------------------------------

onMounted(() => {
  const canvas = canvasRef.value
  try {
    // NOTE on buffering: WebGL exposes no swap-chain / buffer-count API —
    // the browser owns presentation (its own queued frames + vsync). So
    // literal triple buffering cannot be implemented from JS; cycling our
    // own framebuffers would only add a blit pass, not parallelism.
    // What IS real: minimal buffers + low-latency hints below, no readbacks
    // anywhere (readPixels would stall the pipeline), and preserve=false so
    // the compositor can recycle the drawing buffer freely.
    const ctxAttrs = {
      antialias: false,
      depth: false, // fullscreen shader march needs no depth/stencil buffer
      stencil: false,
      alpha: false, // opaque output composites cheaper
      preserveDrawingBuffer: false,
      desynchronized: true, // hint: skip the compositor vsync queue (lower latency)
      powerPreference: 'high-performance',
    }
    gl =
      canvas.getContext('webgl2', ctxAttrs) ||
      canvas.getContext('webgl', ctxAttrs) ||
      canvas.getContext('experimental-webgl')
    if (!gl) {
      throw new Error('WebGL is not supported by this browser.')
    }

    program = createProgram(gl, vertSource, fragSource)
    gl.useProgram(program)

    // The ONLY geometry in the app: a fullscreen triangle that invokes
    // the fragment shader once per pixel. The sphere is purely an SDF.
    const positions = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'aPosition')
    if (posLoc < 0) {
      throw new Error("Attribute 'aPosition' not found in vertex shader.")
    }
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    cacheUniformLocations()
    setStaticUniforms()

    window.addEventListener('resize', onWindowResize)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onWindowBlur)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    smYaw = config.camYaw
    smPitch = config.camPitch
    smDist = config.camDist
    resizeCanvasToDisplaySize()
    startTime = performance.now()
    lastFrameMs = 0
    rafId = requestAnimationFrame(frame)
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    console.error(e)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('blur', onWindowBlur)
  canvasRef.value?.removeEventListener('pointerdown', onPointerDown)
  canvasRef.value?.removeEventListener('pointermove', onPointerMove)
  canvasRef.value?.removeEventListener('pointerup', onPointerUp)
  canvasRef.value?.removeEventListener('pointercancel', onPointerUp)
  canvasRef.value?.removeEventListener('wheel', onWheel)
  keysDown.clear()
  activePointers.clear()
  if (gl && program) {
    gl.deleteProgram(program)
    program = null
  }
})
</script>

<style scoped>
.raymarch-container {
  position: fixed;
  inset: 0;
  background: #000;
}

.raymarch-canvas {
  width: 100vw;
  height: 100vh;
  display: block;
  touch-action: none; /* pointer drag / pinch own the touch gestures */
  cursor: grab;
}

.raymarch-canvas:active {
  cursor: grabbing;
}

.hud {
  position: absolute;
  top: 12px;
  left: 12px;
  min-width: 240px;
  padding: 10px 12px;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.7;
  color: #d7e0f0;
  background: rgba(8, 12, 24, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  pointer-events: none;
}

.hud-title {
  font-weight: 700;
  margin-bottom: 4px;
}

.hud-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.hud-row code {
  color: #9fd0ff;
}

.hud-hint {
  justify-content: center;
  opacity: 0.6;
  margin-top: 2px;
}

.hud-error {
  margin-top: 8px;
  color: #ff8a8a;
  white-space: pre-wrap;
}

.controls {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 230px;
  max-height: calc(100vh - 24px);
  overflow-y: auto;
  padding: 10px 12px;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d7e0f0;
  background: rgba(8, 12, 24, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.controls-title {
  font-weight: 700;
  margin-bottom: 6px;
}

.controls-title:not(:first-child) {
  margin-top: 10px;
}

.ctl {
  display: block;
  margin-bottom: 6px;
}

.ctl span {
  display: flex;
  justify-content: space-between;
}

.ctl span code {
  color: #9fd0ff;
}

.ctl input[type='range'] {
  width: 100%;
  accent-color: #6ea8ff;
}

.ctl input[type='color'] {
  width: 100%;
  height: 26px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.controls-note {
  opacity: 0.6;
  margin-bottom: 6px;
}

.ctl-check span {
  align-items: center;
}

.ctl-check input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: #6ea8ff;
  cursor: pointer;
}

.debug-select {
  width: 100%;
  margin-top: 2px;
  padding: 4px 6px;
  font: inherit;
  color: #d7e0f0;
  background: rgba(20, 28, 48, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  cursor: pointer;
}

.loop-track {
  height: 4px;
  margin: 4px 0 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.loop-fill {
  width: 100%;
  height: 100%;
  background: #6ea8ff;
  transform: scaleX(0);
  transform-origin: left center;
}
</style>
