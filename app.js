const express = require('express')
const next = require('next')
require('dotenv').config();
const {ObjectId,MongoClient}  = require('mongodb');
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()
  app.use(express.json());
  app.use(async (req, res, next) => {
    try {
      console.log("process.env.MONGOURI",process.env.MONGOURI)
      const client = await MongoClient.connect(process.env.MONGOURI);
      const db = client.db('mbs');

      req.db = db;
      next();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.sendStatus(500);
    }
  });
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get('/leads', async (req, res) => {
    try {
      console.log("inside rides")
      const collection = req.db.collection('leads');
      const rides = await collection.find().toArray();
      res.json(rides);
    } catch (error) {
      console.error('Error retrieving users from MongoDB:', error);
      res.sendStatus(500);
    }
  });
  app.post('/leads', async (req, res) => {
    try {
      const collection = req.db.collection('leads');
      const response = await collection.insertOne(req.body);
      res.json(response);
    } catch (error) {
      console.error('Error retrieving leads from MongoDB:', error);
      res.sendStatus(500);
    }
  });
  app.delete('/leads/:id', async (req, res) => {
    try {
      const collection = req.db.collection('leads');
      console.log("req.params.id",req.params.id)
      const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json({ message: 'lead Document deleted successfully' });
    } catch (error) {
      console.error('Error retrieving leads from MongoDB:', error);
      res.sendStatus(500);
    }
  });
  app.patch('/leads/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedFields = req.body;
      const collection = req.db.collection('leads');
      console.log("req.params.id",req.params.id)
      const result = await collection.updateOne({ _id: new ObjectId(req.params.id) },
      { $set: updatedFields });    
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'leads not found' });
      }
      
      res.status(200).json({ message: 'Lead updated successfully' });
    } catch (error) {
      console.error('Error retrieving users from MongoDB:', error);
      res.sendStatus(500);
    }
  });










  app.get('*', (req, res) => {
    return handle(req, res)
  })
  app.listen(3000, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.NODE_ENV} `)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})