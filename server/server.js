const http = require('http')
const express = require('express')
const ShareDB = require('sharedb')
const Logger = require('sharedb-logger')
const db = require('sharedb-mongo')('mongodb://localhost:27017/data')
const richText = require('rich-text')
const WebSocket = require('ws')
const WebSocketJSONStream = require('websocket-json-stream')

ShareDB.types.register(richText.type)
const backend = new ShareDB({db})
const logger = new Logger(backend)
createDoc(startServer)

function createDoc(callback) {
  const connection = backend.connect()
  const doc = connection.get('docs', 'richtext')
  doc.fetch(function(err) {
    if (err) throw err
    if (doc.type === null) {
      doc.create([
        {insert: 'Merry Christmas ya\' filthy animals.'}],
        'rich-text', callback)
      return;
    }
    callback()
  });
}

function startServer() {
  const app = express();
  app.use(express.static(__dirname + '/../client'));
  const server = http.createServer(app);

  // Connects any incoming WebSocket connection to ShareDB
  let wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws, req) {
    let stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  })

  server.listen(8080);
  console.log('Listening on 80\u00B2');
}
