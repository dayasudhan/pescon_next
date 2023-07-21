const express = require('express')
const next = require('next')
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get('/leads', (req, res) => res.send({'name':'dayasudhan'}));
  app.get('*', (req, res) => {
    return handle(req, res)
  })
  app.listen(3000, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.port}.${process.env.DEV} `)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})