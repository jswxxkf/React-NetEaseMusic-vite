import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// =====================
import path from 'path'
const pathResolve = (dirPath: string) => path.resolve(process.cwd(), dirPath)

// https://vitejs.dev/config/
export default ({ command }) => {
  const isBuild = command === 'build'

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    server: {
      port: 8002,
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:5000',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  })
}
