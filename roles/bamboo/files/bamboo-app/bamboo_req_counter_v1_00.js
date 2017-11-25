var http = require('http');
var config = require('./config.json');
var http_req_counter=0;
http.createServer( function(rquest,response)
{
	console.log('New connection has just beinig created');
        http_req_counter++;
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.write("Number of HTTP request is: "+http_req_counter+' Role: bamboo Machine: smart-panda');
        response.end();
}).listen(config.port)
console.log('Micro service server bamboo Started ...');
