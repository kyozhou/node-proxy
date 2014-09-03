/*
 * kyozhou@sina.com
 * 20140903
 */


var server = require('net').createServer(); 
var config = {
    port: 8001,
    ip: '127.0.0.1'
}

server.on('listening', function() {
    console.log('Server is listening on port', config.port);
});
server.on('connection', function(socket) {
    console.log('Server has a new connection');
    socket.on('data', function(data) {
        console.log('got:', data.toString())
        if (data.toString().toLowerCase() === 'quit') {
            socket.write('Bye bye!');
            return socket.end();
        }
    socket.write(data);
    });
    //socket.end();
    //server.close();
});
server.on('close', function() {
    console.log('Server is now closed');
});
server.on('error', function(err) {
    console.log('Error occurred:', err.message);
});
server.listen(config.port);


/* 
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var config = {
    port: 8001,
    ip: '127.0.0.1'
}
var http = require('http');
http.createServer(function (req, res) {
    console.log("url:"+ req.url + "\n");
    proxy.web(req, res, { target: 'http://proxy.kyozhou.com:8001' });
}).listen(config.port, config.ip);

proxy.on('error', function(e) {
    console.log('error:-------------');
    console.log(e);
});

console.log('Server running at http://'+ config.ip +':'+ config.port +'/');
*/

