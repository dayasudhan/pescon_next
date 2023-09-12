const admin = require("firebase-admin");
// path to service account
const serviceAccount = require("./ServiceAccount.json");
const dbUrl = "https://pescon.firebaseio.com";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl,
});

module.exports = admin;