const express = require('express')
const next = require('next')
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.get('/hello', (req, res) => res.send('Namaste Home Page'));
  server.get('/test', (req, res) => res.send('Namaste Test123 Page'));
  server.get('*', (req, res) => {
    return handle(req, res)
  })
  server.listen(3000, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.port}.${process.env.DEV} `)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})