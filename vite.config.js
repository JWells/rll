import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  build: {
    outDir: 'docs'
  },
  base: 'https://jwells.github.io/rll',
  plugins: [react()],
})
