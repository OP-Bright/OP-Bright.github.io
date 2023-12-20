var converter = require('./../middleware/converter')
var bodyParser = require('body-parser')

var sensorRoutes = require('./../routes/sensors');
var actuatorRoutes = require('./../routes/actuators');

const express = require('express'),
	cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", function (req, res, next) {
	res.addHeader("Access-Control-Allow-Origin", "*");
	next();
  });
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get('/', function(req, res){
	res.send('an appropriate message');
});

app.get('/pi', function(req, res){
	res.send('a different response than you did in the root.');
});

app.use(converter());
module.exports = app;

// I'm looking through the files at this very moment!