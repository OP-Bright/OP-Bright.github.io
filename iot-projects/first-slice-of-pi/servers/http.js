var sensorRoutes = require('./../routes/sensors');
var actuatorRoutes = require('./../routes/actuators');

const express = require('express'),
	cors = require('cors');

var app = express();

app.use(cors());
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get('/', function(req, res){
	res.send('an appropriate message');
});

app.get('/pi', function(req, res){
	res.send('a different response than you did in the root.');
});

module.exports = app;

// I have looked through all of the files.
