import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy: {
      // '/api': { // 将以 /api 开头的请求转发到 http://example.com
      //   target: 'http://apis.juhe.cn/',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // },
      '/bookApi': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/bookApi/, '')
      }
    } 
  }
})
