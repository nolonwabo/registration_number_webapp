"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var model = require('./model');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  var regNum = req.body.regNum;
  res.render('index', {});
});

var storeRegistration = [];
app.post('/reg_numbers', function(req, res) {
  var regNum = req.body.regNum;
  var storingRegPlates = new model.storeRegNum({
    regNum: regNum
  });
  storeRegistration.push(regNum);

  storingRegPlates.save(function(err) {
    if (err) {
      console.log('Error  Message: ' + err);
    } else {
      console.log('Save to database');
      res.render('index', {
        numberPlates: storeRegistration
      });
    }
  });

});
app.post('/filter', function(req, res) {
  var town = req.body.town;
  console.log(town);
  model.storeRegNum.find({
    regNum: {
      '$regex': '.*' + town
    }
  }, function(err, plates) {
    if (err) {
      console.log(err);
    } else {
      console.log(plates);
      res.render('index', {
        regPlates: plates
      })
    }
  })
})
var port = process.env.PORT || 3001
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
