var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors'),// add
  path = require('path');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://x2008x:wasko123@ds115198.mlab.com:15198/matusik');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add
var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

// add
var cons = require('consolidate');
// add
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain);


app.get('/tasks/:id', cors(allowCrossDomain), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

// view engine setup
app.use(express.static(__dirname + '/views'));

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});