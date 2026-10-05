// Fullscreen-triangle vertex shader.
// The only geometry in the app: 3 vertices covering the whole clip space.
// All real scene geometry (the sphere) lives as an SDF in the fragment shader.
attribute vec2 aPosition;

// NDC position passed through so the fragment shader can build camera rays.
varying vec2 vNdc;

void main() {
  vNdc = aPosition;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
