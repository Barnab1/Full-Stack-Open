import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- AJOUTEZ CETTE SECTION 'server' ---
  server: {
    port: 5173, // 
    proxy: {
      '/persons': { // Lorsque votre frontend fait une requête à '/persons'
        target: 'https://cuddly-meme-456pqv4vgrvc7prw-3001.app.github.dev', // Vite va la rediriger vers cette URL
        changeOrigin: true, // Ceci est important pour que le serveur cible pense que la requête vient de lui-même
      },
      // Si votre json-server avait un préfixe API, par exemple si vous appeliez /api/notes,
      // la configuration serait plutôt :
      // '/api': {
      //   target: 'https://cuddly-meme-456pqv4vgrvc7prw-3001.app.github.dev',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''), // Enlève '/api' du chemin avant d'envoyer au backend
      // }
      // Mais pour votre cas actuel avec '/notes', la première version est la bonne.
    },
  },
  // --- FIN DE L'AJOUT ---
})