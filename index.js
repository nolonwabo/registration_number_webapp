"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
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
  var massage = 'The registration already in use.';
  model.storeRegNum.findOne({
      regNum: regNum
    },
    function(err, platesStored) {
      if (err) {
        return (err);
      } else if (platesStored) {
        storeRegistration.push(platesStored);
        platesStored = 1;
        res.render('index', {
          massege: massage
        });
      } else {

        if (!platesStored) {
          var storingRegPlates = new model.storeRegNum({
            regNum: regNum
          });
          storeRegistration.push(platesStored);
          storingRegPlates.save(function(err, data) {
            if (err) {
              return err
            }
            model.storeRegNum.find({}, function(err, results) {
              if (err) {
                return err
              }
              res.render('index', {
                numberPlates: results
              });

            })
          })
        }
      }
    })
});

app.post('/filter', function(req, res) {
  var town = req.body.town;
  var output = "Please try again";
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
  // if (regNum === town) {
  //   res.render('index',{display: output})
  // }
});

app.post('/all', function(req, res) {
  model.storeRegNum.find({}, function(err, all) {
    if (err) {
      return err;
      console.log(err);
    }
    console.log(all);
    res.render('index', {
      allReg: all
    })
  })
});

app.post('/reset', function(req, res) {
  model.storeRegNum.remove({}, function(err, remove) {
    if (err) {
      return err;
    }
    res.render('index')
  })
});

var port = process.env.PORT || 3001
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
