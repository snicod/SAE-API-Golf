// core imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const weatherapiRouter = require('./routes/weatherapi.route'); // Imports routes
const Config = require("./commons/config");

// extras imports
const path = require('path');
const fs = require('fs');

const http = require('http');

/*
CAUTION :
Using ssl to have an access to this API may be problematic in case of Java is used to send requests.
Indeed, JVM checks the certificate and if it is not recognize as valid, the JVM rejects the connection
to the API. Two solutions :
- creating and using a valid certificate for the API
- bypassing certifcate verification on the Java side (example in https://howtodoinjava.com/java/java-security/bypass-ssl-certificate-checking-java/)

The first option is obviously the only possible for production version.

const https = require('https');
const privateKey  = fs.readFileSync('ssl/weatherapi.key', 'utf8');
const certificate = fs.readFileSync('ssl/weatherapi.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
*/

//process.chdir('/home/sdomas/code/node/geseapi');
// read env files
const result = require('dotenv').config();
if (result.error) {
  throw result.error
}


// use express
const app = express();

const corsOptions = {
    methods: 'GET,POST,PUT,PATCH,DELETE',
    origin: [ /.*$/ ],
    allowedHeaders: "x-session-id, Origin, Content-Type, Accept",
    credentials: true,
};

// setup mongo connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost/weatherapi';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.set('debug',true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', () => { console.error.bind(console, 'MongoDB connection error:')});

mongoose.set('useFindAndModify', false);

// get the Right model to initialize Rights collection if it is empty
const DbInint = require('./db.init');
DbInint.initBdD()


// define pre-processing: CORS, parsing JSON, ...

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// define routes
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-session-id, Origin, Content-Type, Accept"
  );
  next();
});

/* serve production version of gnose app. */
//app.use(express.static(path.join(__dirname, '../../vuejs/gnose/dist')));


app.use('/weatherapi', weatherapiRouter);

app.use((req,res,next) => {
  res.status(404).send({error:1, status: 404, data: 'route d\'accès à l\'API invalide'})
})

// define error control
app.use((err, req, res, next) => {
    console.log(JSON.stringify(err));
    if (err.status === undefined) {
      res.status(500).send({error:2, status: 500, data: 'Erreur interne de \'API'})
    }
    else {
      res.status(err.status).send(err)
    }
  }
);


// start server with SSL
/*
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.PORT, () =>
  console.log(`weatherapi started on port ${process.env.PORT}!`)
);
 */

// start server without SSL

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () =>
  console.log(`weatherapi started on port ${process.env.PORT}!`)
);

