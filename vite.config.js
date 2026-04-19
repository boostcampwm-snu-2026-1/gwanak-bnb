import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/accommodations': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
        },
        '/api/kakao': {
          target: 'https://dapi.kakao.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/kakao/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `KakaoAK ${env.VITE_KAKAO_REST_API_KEY}`);
              proxyReq.removeHeader('referer');
              proxyReq.removeHeader('origin');
            });
          },
        },
      },
    },
  }
})
