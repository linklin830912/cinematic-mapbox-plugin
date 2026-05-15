import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MapLibreStyleSwitcher',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['maplibre-gl']
    }
  },
  plugins: [dts()]
});