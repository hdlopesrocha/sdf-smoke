import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Relative asset paths so the production build works from any sub-path
  // (e.g. https://hdlopesrocha.github.io/sdf-smoke/).
  base: './',
})
