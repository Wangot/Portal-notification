var express = require('express');
var router = express.Router();

module.exports = function(app){
    // app.use('/api', require('./api'));

    // PUBLIC PAGES
    app.use('/', require('./public'));

    // PROTOTYPE
    app.use('/test', require('./test'));

    // NOTE: Always put this at the end of the router instance
    /*router.get('/:subdomain', function(req, res) {
        res.redirect('http://www.ubook.no/');
    });*/
    app.use('/', router);
};