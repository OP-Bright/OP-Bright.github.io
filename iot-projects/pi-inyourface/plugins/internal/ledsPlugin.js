const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;

let actuator1, actuator2;
let model = resources.pi.actuators.leds;
let pluginName = resources.pi.actuators.leds[1].name + ", " + resources.pi.actuators.leds[2].name;

function connectHardware () {
	  actuator1 = new Gpio(model[1].gpio, 'out')
	  actuator2  = new Gpio(model[2].gpio, 'out')
};

exports.start = function (params) {
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

exports.stop = function () {
	actuator1.write(0)
	actuator2.write(0)
	actuator1.unexport();
	actuator2.unexport();
};

exports.switchOnOff = {
	1: function (val) {
		if (val) {
			actuator1.write(1)
		} else {
			actuator1.write(0)
		}
	},
	2: function (val) {
		if (val) {
			actuator2.write(1)
		} else {
			actuator2.write(0)
		}
	},
};

// TODO 1: Complete the ledsPlugin!
