import { defineConfig } from 'vite'
import Rails from 'vite-plugin-rails'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    Rails(),
    visualizer(),
  ],
})
