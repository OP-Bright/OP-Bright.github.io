const json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if (req.result) {
			if (req.accepts('html')){
				let transform = {'<>': 'div', 'html': [
					{'<>': 'p', 'html': [
						{'<>': 'h1', 'html': '${name}'}
					]},
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'Decription - '},
						{'<>': 'p', 'html': '${description}'}
					]},
					{'<>': 'p', 'html': [
						{'<>': 'b', 'html': 'Output - '},
						{'<>': 'p', 'html': '${value}'}
					]}
				]};
				res.send(json2html.transform(req.result, transform));
				return;
			} else {
				res.send(req.result)
				return;
			}
		} else {
			next();
		}
	};
};
