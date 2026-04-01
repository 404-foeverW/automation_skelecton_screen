import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 路径解析（需node环境）
import renderSkeleton from './plugins/renderSkeleton/renderSkeleton'
import SkeletonPlaceholder from './plugins/SkeletonPlaceholder/SkeletonPlaceholder'

export default defineConfig({
  // 1. 插件
  plugins: [vue(), renderSkeleton(), SkeletonPlaceholder()],

  // 2. 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },

  // 3. 开发服务器
  server: {
    host: '0.0.0.0', // 局域网访问
    port: 3000,      // 端口
    open: false,      // 自动打开
    cors: true,      // 跨域
    proxy: {         // 接口代理
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // 4. 构建配置
  build: {
    outDir: 'dist',        // 输出目录
    assetsDir: 'static',   // 静态资源目录
    minify: 'terser',      // 代码压缩
    terserOptions: {
      compress: {
        drop_console: true // 打包删除console
      }
    }
  },
  esbuild: {
    pure: ['eval']
  }
})