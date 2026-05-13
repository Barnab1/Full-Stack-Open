import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- C'EST LA SECTION PROXY CRITIQUE ---
  server: {
    port: 5173, // Port du frontend
    proxy: {
      // Intercepte le préfixe '/api' utilisé par votre frontend (ex: '/api/persons')
      '/api': { 
        // L'URL de votre serveur Express qui écoute sur le port 3001
        target: 'http://localhost:3001/', 
        changeOrigin: true, 
      },
    },
  },
  // --- FIN DE LA SECTION PROXY ---
})