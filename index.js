"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var schema = require('./model');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
var server = app.listen(3001);

app.get('/', function(req, res) {
  var regNum = req.body.regNum;
  res.render('index', {});
});
var storeRegistration =[];
app.post('/reg_numbers', function(req, res) {
  var regNum = req.body.regNum;
  storeRegistration.push(regNum);
  res.render('index', {
    numberPlates: storeRegistration
  });
});
