import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          from: 'vue-router',
          imports: [
            'RouteRecordRaw',
            'RouteLocationRaw',
            'RouteLocationNormalized',
            'RouteRecordName',
            'RouteParamsRaw',
            'LocationQueryRaw',
          ],
          type: true,
        },
        'pinia',
      ],
      dts: 'typings/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
