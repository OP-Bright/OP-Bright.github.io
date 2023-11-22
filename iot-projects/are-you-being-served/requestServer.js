// requestServer.js file
var args = process.argv.slice(2)
const http = require("http");
const request = require("request");
let port = 9293;

http.createServer(function(req,res){
    // handle response
    var url = args[0] ? args[0] : 'https://github.com/';
    request(url, function (error, response, body){
        if (!body || !response || (error === null && response.statusCode !== 200)){
            res.end("bad URL\n");
            return;
        }
        if ((!error === true && response.statusCode === 200)){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(body)
            res.end();
            return;
        }
        else {
            res.writeHead(response.statusCode, {'Content-Type': 'text/plain'})
            res.write(error.toString())
            res.end();
            return;
        }
    })
  }).listen(port);