
var express = require('express'),
    app = express(),
    expressValidator = require('express-validator')
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config');

//view
app.use(express.static(__dirname + '/build'));

var server = app.listen(config.port || 8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Running on http://%s:%s ', host, port);
});
