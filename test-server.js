const http = require("http");
const port = 8686;

http.createServer(function(req,res){
  // handle response
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Oh boy. ');
  res.end('No more text!');
}).listen(port);

