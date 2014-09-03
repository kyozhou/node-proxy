/*
 * kyozhou@sina.com
 * 20140903
 */

var http = require('http');

var config = {
    port: 8001,
    ip: '127.0.0.1'
}

var socket = null;
http.createServer(function (req, res) {
    socket = socket || new net.Socket();
    socket.write("hello!");
}).listen(config.port, config.ip);

console.log('Server running at http://'+ config.ip +':'+ config.port +'/');


var crypto = require('crypto');

function decode(cryptkey, iv, secretdata) {
    var  decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
         decoded  = decipher.update(secretdata, 'base64', 'utf8');

    decoded += decipher.final( 'utf8' );
    return decoded;
}

function encode(cryptkey, iv, cleardata) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
        encoded  = encipher.update(cleardata, 'utf8', 'base64');

    encoded += encipher.final( 'base64' );
    return encoded;
}

var cryptkey   = crypto.createHash('sha256').update('kyozhou.com@kyozhou.com').digest(),
    iv         = '1234567890000000',
    buf        = "Hello World",
    enc        = encode( cryptkey, iv, buf );

var dec        = decode(cryptkey, iv, enc);

function b64enc(data) {
    var b   = new Buffer(data, 'binary');
    return b.toString('base64');
}

console.warn("Encoded length: ", enc);
console.warn("Decoded all: " + dec);
