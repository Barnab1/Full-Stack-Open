// server.cjs
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json') // Assurez-vous que db.json est dans le même répertoire
const middlewares = jsonServer.defaults()

// Ajoutez cette ligne pour le middleware CORS
// Ceci autorise toutes les origines (utile pour le développement)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Si vous avez besoin de gérer des requêtes de type PUT, POST, DELETE, etc., ajoutez aussi:
server.use(jsonServer.bodyParser) // Pour parser le corps des requêtes (POST/PUT)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now() // Exemple: ajoute une date de création
  }
  // Continuez le processus normal de json-server
  next()
})

server.use(middlewares)
server.use(router)

const port = 3001 // Assurez-vous que c'est le même port que dans votre frontend
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port} with CORS enabled`)
})