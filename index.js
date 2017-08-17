"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

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
  res.render('index')
})

app.get('/reg_number/:registration', function(req, res) {
  res.render('index', {
    output: req.params.registration
  });
  console.log(req.params.registration);
});
