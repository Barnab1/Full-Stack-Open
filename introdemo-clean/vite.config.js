import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- C'EST LA SECTION PROXY CRITIQUE ---
  server: {
    port: 5173, // Port du frontend
    proxy: {
      // Intercepte le préfixe '/api' utilisé par votre frontend (ex: '/api/notes')
      '/api': { 
        // L'URL de votre serveur Express qui écoute sur le port 3001
        target: 'https://cuddly-meme-456pqv4vgrvc7prw-3001.app.github.dev', 
        changeOrigin: true, 
      },
    },
  },
  // --- FIN DE LA SECTION PROXY ---
})