
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config');


//bodyParser
app.use(bodyParser.json());
//view
app.use(express.static(__dirname + '/build'));

//database
/*mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, function(err, res) {
  if(err){
    console.log('Sorry, there is no mongo db server running.');
    throw err;
  }
  console.log('Successfully connected to mongodb');
});*/

var server = app.listen(config.port || 8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Running on http://%s:%s ', host, port);
});
