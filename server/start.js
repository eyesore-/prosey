const {createServer} = require("http")
const {handleCollabRequest} = require("./server")
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

let staticFiles = serveStatic('./client')

const port = process.env.PORT || 8000

// The collaborative editing document server.
server = createServer((req, resp) => {
  console.log("req received for:", req.url)
  if (!handleCollabRequest(req, resp)) {
    console.log('serving static files, req.url', req.url)
    staticFiles(req, resp, finalhandler(req, resp))
  }
})

server.listen(port)

console.log("Collab server listening on " + server.address().port)
