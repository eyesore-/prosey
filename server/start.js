const {createServer} = require("http")
const {handleCollabRequest} = require("./server")
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

let staticFiles = serveStatic('./client')

const port = 8000

// The collaborative editing document server.
createServer((req, resp) => {
  console.log("req received for:", req.url)
  if (!handleCollabRequest(req, resp)) {
    console.log('serving static files, req.url', req.url)
    staticFiles(req, resp, finalhandler(req, resp))
  }
}).listen(port, "127.0.0.1")

console.log("Collab demo server listening on " + port)
