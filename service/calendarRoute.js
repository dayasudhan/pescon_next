
const { google } = require('googleapis');
const {ObjectId,MongoClient}  = require('mongodb');
const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    process.env.SCOPES
);
  
const calendar = google.calendar({
    version: 'v3',
    project: process.env.GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});
function logStartOfMonthBetweenDates(startDate, endDate) {
    // Create a copy of the start date to iterate through months
    const currentDate = new Date(startDate);
    const dates = [];
    while (currentDate <= endDate) {
      // Log a message at the start of each month
     // console.log(`Start of Month: ${currentDate}`);
      const formattedDate = currentDate.toISOString().split('T')[0];
      console.log(`${formattedDate}T10:00:00`);
    //   console.log("formattedDate",formattedDate)
      dates.push(formattedDate);
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return dates;
  }
async function handleCalendarRoute(req, res) {
  try {
    console.log("calendar", req.query.id);

    const collection = req.db.collection('leads');
    const objectId = new ObjectId(req.params.id);
    const result = await collection.findOne({ _id: objectId });
    console.log("inside leades/id", req.params.id, result);
    if (!result) {
      res.status(404).json({ message: 'Document not found' });
    }
    const startDate = new Date('2023-09-15'); // Replace with your start date
    const endDate = new Date('2023-12-27'); // Replace with your end date
    
    // Call the function to log at the start of each month
    const dates = logStartOfMonthBetweenDates(startDate, endDate);
    console.log("dates",dates)
    const eventList = dates.map(e=>{
        return {
            summary: `${result.id} - ${result.name}`,
            location: `Landmark : ${result.land_mark} ,Address : ${result.address},City : ${result.city}` ,
            description:  `Phone : ${result.phone} ,pestsToControl : ${result.pestsToControl},propertyType : ${result.propertyType}`,
            start: {
              dateTime: `${e}T10:00:00`,
              timeZone: 'IST',
            },
            end: {
              dateTime:  `${e}T12:00:00`,
              timeZone: 'IST',
            },
          };
     })
            // const event = {
            //     summary: `${result.id} + '-'+ ${result.name}`,
            //     location: `Landmark : ${result.land_mark} ,Address : ${result.address},City : ${result.city}` ,
            //     description:  `Phone : ${result.phone} ,'pestsToControl' : ${result.pestsToControl},'propertyType' : ${result.propertyType}`,
            //     start: {
            //       dateTime: `${e}T10:00:00`,
            //       timeZone: 'IST',
            //     },
            //     end: {
            //       dateTime:  `${e}T12:00:00`,
            //       timeZone: 'IST',
            //     },
            //   };
 console.log("eventList",eventList)
    const auth = new google.auth.GoogleAuth({
      keyFile: './config/pescon-9db2a6f07876.json',
      scopes: 'https://www.googleapis.com/auth/calendar', //full access to edit calendar
    });

    // res.sendStatus(500);
    eventList.forEach(eventElement => {
        
    
    auth.getClient().then(a => {
        
      calendar.events.insert({
        auth: a,
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: eventElement,
      }, function (err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event created: %s', event.data);
        
      });
    });
});
  } catch (error) {
    console.error('Error retrieving users from MongoDB:', error);
    res.sendStatus(500);
  }
}

// Export the route handler function.
module.exports = handleCalendarRoute;