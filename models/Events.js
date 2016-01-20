'use strict';
var redis = require('redis');
var sub = redis.createClient();
var pub = redis.createClient();
sub.subscribe('notification');
sub.subscribe('notification_test');

module.exports = function(io) {
    io.use(function(socket, callback){
        console.log('=====> cookie ', socket.handshake.session)
        callback(null, true);
    });

    io.on('connection', function(socket) {
        /*
         When the user sends a chat message, publish it to everyone (including myself) using
         Redis' 'pub' client we created earlier.
         Notice that we are getting user's name from session.
         */
        socket.on('channel1', function(data) {
            var reply = JSON.stringify({
                action: 'action',
                msg: ' message'
            });
            pub.publish('channel1', reply);
        });

        /*
         When a user joins the channel, publish it to everyone (including myself) using
         Redis' 'pub' client we created earlier.
         Notice that we are getting user's name from session.
         */
        socket.on('channel2', function() {
            var reply = JSON.stringify({
                action: 'action',
                msg: ' message'
            });
            pub.publish('channel2', reply);
        });

        /*
         Use Redis' 'sub' (subscriber) client to listen to any message from Redis to server.
         When a message arrives, send it back to browser using socket.io
         */
        sub.on('message', function(channel, message) {
            console.log("====> ", channel, message);
            if('notification_test' == 'channel'){
                socket.emit(message.channel, message);
            }else{
                socket.emit(channel, message);
            }
        });
    })
}
