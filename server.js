/*
Maybe revisit later. ids are good enough for now
*/

const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("./db.json")
const middlewares = jsonServer.defaults()
const { get, find, append } = require("partial.lenses")
const { whereEq } = require("ramda")

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get("/decks/:name", (req, res) => {
  const db = router.db.value()
  const { name } = req.params

  const result = get(["decks", find(whereEq({ name }))])(db)
  res.send(result)
})

server.post("/decks/:name", (req, res) => {
  const db = router.db.value()
  const { name } = req.params

  const result = get(["decks", find(whereEq({ name }))])(db)
  res.send(result)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log("JSON Server is running")
})
