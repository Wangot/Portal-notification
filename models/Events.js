'use strict';
var path = require('path');
var env = process.env.NODE_ENV || "development";
var config = require(path.resolve("./models/helpers/config"))(env);
var sub = require("redis").createClient(config.redis.port, config.redis.host);

var adminChannel = 'COMPANY_ADMIN';

sub.subscribe(config.redis.channels.notification);

module.exports = function(io) {

    sub.on('message', function(channel, message) {

        console.log("<==== ", channel, message);

        if('main-notification-channel' == channel)
        {
            var msg = JSON.parse(message);
            var socketChannel = 'COMPANY_' + msg.company_id;

            console.log("====> ", socketChannel);
            io.emit(socketChannel, msg);

            io.emit(adminChannel, msg);
        }
    });

    io.use(function(socket, callback){
        //console.log('=====> cookie ', socket.handshake.session)
        callback(null, true);
    });

    io.on('connection', function(socket) {
        /*
         When the user sends a chat message, publish it to everyone (including myself) using
         Redis' 'pub' client we created earlier.
         Notice that we are getting user's name from session.
         */
        //socket.on('channel1', function(data) {
        //    var reply = JSON.stringify({
        //        action: 'action',
        //        msg: ' message'
        //    });
        //    pub.publish('channel1', reply);
        //});

        /*
         When a user joins the channel, publish it to everyone (including myself) using
         Redis' 'pub' client we created earlier.
         Notice that we are getting user's name from session.
         */
        //socket.on('channel2', function() {
        //    var reply = JSON.stringify({
        //        action: 'action',
        //        msg: ' message'
        //    });
        //    pub.publish('channel2', reply);
        //});

        /*
         Use Redis' 'sub' (subscriber) client to listen to any message from Redis to server.
         When a message arrives, send it back to browser using socket.io
         */
        //console.log('being created');
        //sub.on('message', function(channel, message) {
        //    console.log("<==== ", channel, message);
        //    if('main-notification-channel' == channel){
        //        var msg = JSON.parse(message);
        //        console.log("====> ", msg.channel, message);
        //        //socket.emit(msg.channel, message);
        //    }else{
        //        //socket.emit(channel, message);
        //    }
        //});

        //socket.on('disconnect', function(){
        //    console.log('user disconnected');
        //});

    })
}
