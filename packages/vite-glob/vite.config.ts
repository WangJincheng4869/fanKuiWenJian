import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode, command })=>{

  return {
    server: {
      port: 5175,
      host: '0.0.0.0',
    },
    build: {
      rollupOptions: {
        external: [new RegExp(`components/test/.*`)],
      },
    },
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
