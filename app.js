const express = require('express')
const next = require('next')
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

server.prepare().then(() => {
  const app = express()
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get("/items", async (req, res) => {
    res.send(await  prisma.item.findMany({}));
  });
  app.get("/enquiries", async (req, res) => {
    res.send(await  prisma.enquiry.findMany({
      include:{
        item:true
      }
    }));
  });
  app.get("/items", async (req, res) => {
    res.send(await  prisma.item.findMany({}));
  });
  app.get('*', (req, res) => {
    return handle(req, res)
  })
  app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.PORT}.${process.env.DEV} `)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})