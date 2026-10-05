<template>
  <div class="raymarch-container">
    <canvas ref="canvasRef" class="raymarch-canvas"></canvas>

    <!-- Minimal debug / info UI. Values mirror the uniforms below;
         structured so they can become interactive controls later. -->
    <div class="hud">
      <div class="hud-title">Smoke + Shockwave</div>
      <div class="loop-track"><div ref="loopBarRef" class="loop-fill"></div></div>
      <div class="hud-row"><span>March steps</span><code>{{ config.maxSteps }}</code></div>
      <div class="hud-row"><span>Camera pos</span><code ref="camPosEl">[0.00, 0.00, 5.00]</code></div>
      <div class="hud-row hud-hint"><span>Drag / WASD orbit · wheel zoom</span></div>
      <div class="hud-row"><span>Light dir</span><code>[{{ config.lightDirection.join(', ') }}]</code></div>
      <div class="hud-row"><span>Loop</span><code ref="phaseEl">0.0s / 8s</code></div>
      <div v-if="error" class="hud-error">{{ error }}</div>
    </div>

    <!-- Live controls (bound directly to shader uniforms). -->
    <div class="controls">
      <div class="controls-title">Smoke</div>
      <label class="ctl">
        <span>Density <code>{{ config.smokeDensity.toFixed(2) }}</code></span>
        <input type="range" min="0" max="2" step="0.05" v-model.number="config.smokeDensity" />
      </label>
      <label class="ctl">
        <span>Radius <code>{{ config.smokeRadius.toFixed(2) }}</code></span>
        <input type="range" min="1" max="2.5" step="0.05" v-model.number="config.smokeRadius" />
      </label>
      <label class="ctl">
        <span>Billow <code>{{ config.noiseAmplitude.toFixed(2) }}</code></span>
        <input type="range" min="0" max="0.8" step="0.01" v-model.number="config.noiseAmplitude" />
      </label>
      <label class="ctl">
        <span>Frequency <code>{{ config.noiseFrequency.toFixed(2) }}</code></span>
        <input type="range" min="0.5" max="4" step="0.05" v-model.number="config.noiseFrequency" />
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
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import vertSource from '../shaders/raymarch.vert?raw'
import fragSource from '../shaders/raymarch.frag?raw'

// ---------------------------------------------------------------------------
// Scene / smoke / shockwave configuration (live uniforms via sliders below).
// MARCH_STEPS lives in the shader as a const; keep maxSteps in sync.
// ---------------------------------------------------------------------------
const LOOP_SECONDS = 8.0 // must match LOOP_DURATION in the fragment shader
const config = reactive({
  maxSteps: 64,
  epsilon: 0.004,
  maxDistance: 100.0,
  // Orbit camera, always looking at the SDF center (SMOKE_CENTER in shader).
  // A/D orbit yaw, W/S orbit pitch, Q/E dolly. Arrow keys mirror WASD.
  camYaw: -1.951, // radians (matches [-3.23, -0.27, -1.29] at dist 3.49)
  camPitch: -0.077, // radians, clamped
  camDist: 3.49, // clamped
  cameraUp: [0.0, 1.0, 0.0],
  cameraFov: 60.0,
  lightDirection: [-0.5, 0.8, 0.6],
  lightColor: [1.0, 1.0, 1.0],
  lightIntensity: 1.2,
  // Smoke puff.
  smokeRadius: 1.7,
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
  // Light & heat.
  smokeColor: '#8ea2c8',
  heatColor: '#ff7a26',
  anisotropy: 0.3,
  heatStrength: 0,
  scatter: 1.0,
  maxDevicePixelRatio: 2.0,
})

const canvasRef = ref(null)
const loopBarRef = ref(null)
const phaseEl = ref(null)
const camPosEl = ref(null)
const error = ref('')

let gl = null
let program = null
let uniformLocations = {}
let rafId = 0
let startTime = 0
let lastFrameMs = 0

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
    'uSmokeRadius',
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
  const lightDir = normalize3(config.lightDirection)
  // Camera position/forward are dynamic (orbit) — uploaded in updateCamera().
  if (u.uCameraUp) gl.uniform3fv(u.uCameraUp, config.cameraUp)
  if (u.uCameraFov) gl.uniform1f(u.uCameraFov, config.cameraFov)
  if (u.uEpsilon) gl.uniform1f(u.uEpsilon, config.epsilon)
  if (u.uMaxDistance) gl.uniform1f(u.uMaxDistance, config.maxDistance)
  if (u.uLightDirection) gl.uniform3fv(u.uLightDirection, lightDir)
  if (u.uLightColor) gl.uniform3fv(u.uLightColor, config.lightColor)
  if (u.uLightIntensity) gl.uniform1f(u.uLightIntensity, config.lightIntensity)
}

function setPerFrameUniforms(timeSeconds) {
  const canvas = canvasRef.value
  const u = uniformLocations
  if (u.uTime) gl.uniform1f(u.uTime, timeSeconds)
  if (u.uAspectRatio) gl.uniform1f(u.uAspectRatio, canvas.width / canvas.height)
  if (u.uResolution) gl.uniform2f(u.uResolution, canvas.width, canvas.height)
  // Scene uniforms are set every frame so the sliders take effect live.
  if (u.uSmokeRadius) gl.uniform1f(u.uSmokeRadius, config.smokeRadius)
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
  if (u.uRippleAmp) gl.uniform1f(u.uRippleAmp, config.rippleAmp)
  if (u.uRippleFreq) gl.uniform1f(u.uRippleFreq, config.rippleFreq)
  if (u.uSmokeColor) gl.uniform3fv(u.uSmokeColor, hexToRgb(config.smokeColor))
  if (u.uScatter) gl.uniform1f(u.uScatter, config.scatter)
  if (u.uAnisotropy) gl.uniform1f(u.uAnisotropy, config.anisotropy)
  if (u.uHeatColor) gl.uniform3fv(u.uHeatColor, hexToRgb(config.heatColor))
  if (u.uHeatStrength) gl.uniform1f(u.uHeatStrength, config.heatStrength)
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
  const dt = Math.min(0.1, lastFrameMs ? (now - lastFrameMs) / 1000 : 0.016)
  lastFrameMs = now
  updateCamera(dt)
  setPerFrameUniforms(elapsed)
  // 8 s loop progress (direct DOM write to avoid re-rendering every frame).
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
    gl =
      canvas.getContext('webgl2', { antialias: false }) ||
      canvas.getContext('webgl', { antialias: false }) ||
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
