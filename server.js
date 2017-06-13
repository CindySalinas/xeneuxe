
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressValidator = require('express-validator'),
    config = require('./config/config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//view
app.use(express.static(__dirname + '/build'));

//validator
app.use(expressValidator({
 customValidators: {
    isDate: function(value) {
      let userDate = new Date(value);
      if(isNaN(userDate))
        return false
      return true;
    }
 }
}));

let Router = require('./server/api')(app);

//database
mongoose.Promise = global.Promise;
//connection url
let uri = 'mongodb://' + config.db.host + '/' + config.db.database;
// execute connection
mongoose.connect(uri, { user: config.db.username, password: config.db.password }, function(err, res){
  if(err) throw err;
  console.log('Connected to db: ' + uri);
});

let server = app.listen(config.port || 8080, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Running on http://%s:%s ', host, port);
});
