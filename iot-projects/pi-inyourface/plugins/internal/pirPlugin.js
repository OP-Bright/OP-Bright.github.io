const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;

let sensor;
const device = resources.pi.sensors.pir;

function connectHardware () {
	sensor = new Gpio(device.gpio, 'in', 'both')
	sensor.watch(function (error, value) {
	if (error) {
		
	}
	else {
		device.value = !!value;
	}
	}
		);
};

function start () {
	connectHardware();
	};
exports.start = start;

function stop () {
	sensor.unexport()
	};
exports.stop = stop;
