const express = require('express')
const next = require('next')
require('dotenv').config();
const {ObjectId,MongoClient}  = require('mongodb');
const dev = process.env.NODE_ENV !== 'production'
const {server,handle} = require('./server');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const googleOAuth = require('./middleware/index');
const firebaseAdmin = require('./config/firebase-config')

const app = express()
  app.use(express.json());
  const mongoMiddleware = async (req, res, next) => {
    try {
          //console.log("process.env.MONGOURI",process.env.MONGOURI)
          const client = await MongoClient.connect(process.env.MONGOURI);
          const db = client.db('mbs');
    
          req.db = db;
          req.client = client;
          console.log("mongomiddleware 1")
          next();
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
          res.sendStatus(500);
        }
  };
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get('/leads/:id',mongoMiddleware, googleOAuth.decodeToken,async(req, res) => 
  {
    console.log("req",req.params,req.url,req.params.id);
    try {
      const collection = req.db.collection('leads');
      //const objectId =new mongodb.ObjectID(req.params.id);
      const objectId = new ObjectId(req.params.id);
      const result = await collection.findOne({ _id :objectId});
      console.log("inside leades/id",req.params.id,result)
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
      
      
    } catch (error) {
      console.error('Error retrieving users from MongoDB:', error);
      res.sendStatus(500);
    }
    console.log("close the monogdbclient")
    req.client.close();
  });
  app.get('/leads',mongoMiddleware,googleOAuth.decodeToken, async (req, res) => {
    try {
      console.log("inside rides")
      const collection = req.db.collection('leads');
      const rides = await collection.find().toArray();
      res.json(rides);
    } catch (error) {
      console.error('Error retrieving users from MongoDB:', error);
      res.sendStatus(500);
    }
    console.log("close the monogdbclient")
    req.client.close();
  });
  app.post('/leads',mongoMiddleware, async (req, res) => {
    try {
      const counterCollection = req.db.collection('counter');
      console.log("req.params.id",req.params.id)
      const result = await counterCollection.findOneAndUpdate({ client: 'pescon' },  
      { $inc: { sequence: 1 }});  
      console.log("result",result.value.sequence);
      req.body['id'] = 'P' + result.value.sequence;
      console.log("result",req.body);
      const collection = req.db.collection('leads');
      const response = await collection.insertOne(req.body);
      console.log("response",response)
      res.json(response);
    } catch (error) {
      console.error('Error retrieving leads from MongoDB:', error);
      res.sendStatus(500);
    }
    req.client.close();
  });
  app.delete('/leads/:id', mongoMiddleware,async (req, res) => {
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
    req.client.close();
  });
  app.patch('/leads/:id',mongoMiddleware, async (req, res) => {
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
    req.client.close();
  });

  app.get('/pdf', async (req, res) => {
    try {
      console.log("req.query.id",req.query.id)
      generatePDF(req.query.id,`${req.protocol}://${req.get('host')}`)
    } catch (error) {
      console.error('Error retrieving users from MongoDB:', error);
      res.sendStatus(500);
    }    
  });
  async function  sendPushNotification(token, title, body) {
    const topic = 'highScores';
    const message = {
      data: {
        score: '850',
        time: '2:45'
      },
      topic: topic
    };
    await firebaseAdmin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);

      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }
  app.get('/pn',  (req, res) => {
    const userToken = 'your-device-token'; // The FCM token of the device you want to send the notification to
    const notificationTitle = 'Hello';
    const notificationBody = 'This is a push notification sent from Node.js';
    sendPushNotification(userToken, notificationTitle, notificationBody);
    res.json({ message: 'Protected route: Access granted!', user: req.user });
  });
  app.get('*', (req, res) => {
    return handle(req, res)
  })
  app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.NODE_ENV} `)
  })
  function getWindowsDownloadFolderPath() {
    const homeDir = os.homedir();
    const downloadFolderPath = path.join(homeDir, 'Downloads');
    return downloadFolderPath;
  };
  async function generatePDF(id,host) {
    const downloadPath = getWindowsDownloadFolderPath();
    const outputpath = `${downloadPath}\\leads_${id}.pdf`;
    console.log("generatePDF 0000 .................")
    const browser = await puppeteer.launch({headless: false,});
    const page = await browser.newPage();
    const pageopts ={
      format: 'letter',
      printBackground: true,
      margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
      preferCSSPageSize: true,
    }
  
    let url = `${host}/agreementprint/?id=` +id;
    console.log("url",url)
    await page.goto(url); // Replace with the URL or HTML content you want to generate PDF from
    
    await page.pdf({
      path: outputpath, // Specify the path where the PDF file will be saved
      format: 'A4' // Specify the page format (e.g., 'A4', 'Letter', etc.)
    });

    await browser.close();
  }
  // async function getNextSequence(name,result)
  // {
 
  //     const userId = req.params.id;
  //     const updatedFields = req.body;
  //     const collection = req.db.collection('counter');
  //     console.log("req.params.id",req.params.id)
  //     const result = await collection.updateOne({ name: 'pescon' },
  //     { $inc: { sequence: 1 }});    
  //      return result
  // }
