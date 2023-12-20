var pirPlugin = require('./plugins/internal/pirPlugin');
pirPlugin.start({});

var dhtPlugin = require('./plugins/internal/dhtPlugin');
dhtPlugin.start({'frequency': 2000});

var ledsPlugin = require('./plugins/internal/ledsPlugin');
ledsPlugin.start()

const httpServer = require('./servers/http');
	resources = require('./resources/model');

const webSocketServer = require('./servers/websockets')

const server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
	webSocketServer.listen(server);
});

process.on('SIGINT', function() {
	pirPlugin.stop();
	dhtPlugin.stop();
	ledsPlugin.stop();
	process.exit();
});
