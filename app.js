const express = require('express')
const next = require('next')
const axios = require('axios');
require('dotenv').config();
const {ObjectId,MongoClient}  = require('mongodb');
const dev = process.env.NODE_ENV !== 'production'
const {server,handle} = require('./server');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const googleOAuth = require('./middleware/index');
const firebaseAdmin = require('./config/firebase-config')
const { google } = require('googleapis');
const calendarRouteHandler = require('./service/calendarRoute');
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
  app.get('/leads/:id',mongoMiddleware, async(req, res) => 
  {
    console.log("req",req.params,req.url,req.params.id);
    try {
      const collection = req.db.collection('leads');
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
  app.get('/leads',mongoMiddleware, async (req, res) => {
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
  app.get('/enquiries',mongoMiddleware, async (req, res) => {
    try {
      console.log("inside rides")
      const collection = req.db.collection('leads');
      const rides = await collection.find().toArray();
      console.log("rides",rides);
      const enquiries = rides.filter(e=>{
        if(!e.contract)
        {
          return true
        }
        else{
          return e?.contract==false
        }
        })
      console.log("enquiries",enquiries);
      res.json(enquiries);
    } catch (error) {
      console.error('Error retrieving users from MongoDB:', error);
      res.sendStatus(500);
    }
    console.log("close the monogdbclient")
    req.client.close();
  });
  app.get('/contracts',mongoMiddleware, async (req, res) => {
    try {
      console.log("inside rides")
      const collection = req.db.collection('leads');
      const rides = await collection.find().toArray();
      console.log("rides",rides);
      const contracts = rides.filter(e=>e?.contract==true)
      console.log("contracts",contracts);
      res.json(contracts);
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
      req.body['contract'] = false;
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
  app.patch('/leads/servicehistory/:id',mongoMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedFields = req.body;
      const collection = req.db.collection('leads');
      console.log("req.params.id",req.params.id)
      const objectId = new ObjectId(req.params.id);
      const  result = await collection.findOne({ _id :objectId});
      console.log("res",result?.serviceHistory)
      if(!result?.serviceHistory)
      {
        console.log("empty");
        const arr = [req.body.serviceHistory]
        result['serviceHistory'] = arr;
      }
      else
      {
        result.serviceHistory.push(req.body.serviceHistory)
      }
      const result2 = await collection.updateOne({ _id: new ObjectId(req.params.id) },
      { $set: { 'serviceHistory': result.serviceHistory }});    
      if (result2.matchedCount === 0) {
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
  // const event = {
  //   summary: 'Sample Event',
  //   location: 'Location',
  //   description: 'Description',
  //   start: {
  //     dateTime: '2023-10-01T10:00:00',
  //     timeZone: 'IST',
  //   },
  //   end: {
  //     dateTime: '2023-10-01T12:00:00',
  //     timeZone: 'UTC',
  //   },
  // };
  // const event = {
  //   summary: `${result.id} -${result.name}`,
  //   location: `Landmark : ${result.land_mark} ,Address : ${result.address},City : ${result.city}` ,
  //   description:  `Phone : ${result.phone} ,pestsToControl: ${result.pestsToControl},propertyType : ${result.propertyType}`,
  //   start: {
  //     dateTime: `${startDate}T10:00:00`,
  //     timeZone: 'IST',
  //   },
  //   end: {
  //     dateTime:  `${startDate}T12:00:00`,
  //     timeZone: 'IST',
  //   },
  //   recurrence: [
  //       fr 
  //     ],
  // };
  app.get('/calendar/:id', mongoMiddleware,calendarRouteHandler);

  app.get('*', (req, res) => {
    return handle(req, res)
  })
  app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.PORT} `)
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

