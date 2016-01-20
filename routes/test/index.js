'use strict';

var express = require('express');
var router = express.Router();

var redis = require('redis');
var pub = redis.createClient();
var sub = redis.createClient();


router.get('/notify', function(req, res, next) {
    var channel = 'notification_test';
    var msg = {
        status: 'success',
        message: 'Default message'
    }

    /*if(req.query.channel){
        channel = req.query.channel;
        console.log(channel)
        sub.subscribe(channel);
    }*/

    if(req.query.message){
        msg.message = req.query.message;
    }

    pub.publish(channel, JSON.stringify(msg));
    res.end('Ok');
});

module.exports = router;