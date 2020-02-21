var config = require('../config.json');
var _ = require('lodash');
var pool = require('../database')();
var moment = require('moment');
var FCM = require('fcm-node');
var express = require('express');
var cors = require('cors');
var fs = require('fs');
var app = express();
app.use(cors({credentials: true, origin: '*'}));
var router = express.Router();
/* var key  = fs.readFileSync('/var/www/html/crt/my.key', 'utf8');
var cert = fs.readFileSync('/var/www/html/crt/my.crt', 'utf8');
var credentials = {
    key: key,
    cert: cert,
    requestCert: false,
    rejectUnauthorized: false
}; */
let port = 4000;
var server = require('http').createServer(app);
var io = require('socket.io')(server, { origins: '*:*', 'pingInterval': 5000, 'pingTimeout': 25000});
io.set('transports', ['websocket', 'polling']);
io.on('connection', function (socket) {
    //sending socket.id
    io.to(socket.id).emit('getSocketID', {socketId : socket.id});

    socket.on('getAppInfo', function(user_id, ack){
        
    });
    
    socket.on('disconnect', function () {
        console.log("Delete  SocketId:" + socket.id);
        socket.disconnect(); 
    });

    socket.on('right_updated', function (ack) {
        console.log('\t\t\t\t\t\t \n\r new_right_updated brodcasted ');
        io.emit('new_right_updated');
        ack({status: 1, msg:`right updated called successfully to socketID ${socket.id}`});
    });
});



server.listen(port);
console.log("socket server started on port " + port);
module.exports = router;
