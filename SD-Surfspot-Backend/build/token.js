'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var User = require('./models').User;

app.use(express.static('public'));
app.use(bodyParser.json());

var authorization = function authorization(request, response, next) {
  var token = request.query.authToken || request.body.authToken;
  if (token) {
    User.findOne({
      where: { authToken: token }
    }).then(function (user) {
      if (user) {
        request.currentUser = user;
        next();
      } else {
        response.status(401);
        response.json({ message: 'Authorization Token Invalid' });
      }
    });
  } else {
    response.status(401);
    response.json({ message: 'Authorization Token Required' });
  }
};

app.get('/', function (request, response) {
  response.json({ message: 'API Example App' });
});

app.get('/user', authorization, function (request, response) {
  response.json({ user: request.currentUser });
});

// app.post('/users', function(request, response){
//   User.create(
//     {
//       firstName: request.body.firstName,
//       lastName: request.body.lastName,
//       email: request.body.email,
//       password: request.body.password
//     }
//   ).then((user)=>{
//     response.json({
//       message: 'success',
//       user: user
//     })
//   }).catch((error)=>{
//     response.status(400)
//     response.json({
//       message: "Unable to create User",
//       errors: error.errors
//     })
//   })
// })


app.post('/users', function (req, res) {
  req.checkBody('name', 'Is required').notEmpty();
  req.checkBody('username', 'Is required').notEmpty();
  req.checkBody('email', 'Is required').notEmpty();
  req.checkBody('password', 'Is required').notEmpty();

  req.getValidationResult().then(function (validationErrors) {
    if (validationErrors.isEmpty()) {
      User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(function (user) {
        res.status(201);
        res.json({
          message: 'success',
          user: user
        });
      });
    } else {
      res.status(400);
      res.json({ errors: { validations: validationErrors.array() } });
    }
  }).catch(function (error) {
    res.status(400);
    res.json({
      message: "Unable to create User",
      errors: error.errors
    });
  });
});

app.listen(4000, function () {
  console.log('Todo Server listening on port 4000!');
});