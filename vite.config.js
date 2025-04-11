import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 添加代理配置来解决CORS问题
  server: {
    proxy: {
      // 将所有/api开头的请求代理到后端服务器
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
        // 如果后端API不包含/api前缀，可以使用rewrite去掉
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
