var express = require('express');
var bodyParser = require('body-parser')
var app = express();

let user = require('./models').users
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.json({message: 'API Example App'})

user.create({
    name:'Bob',
    userName: 'bobo123',
    email: 'iambob@gmail.com',
    friends: 1}).then(function(contact){
        console.log(user.get);
        return user.create({
            beach: 'cardiff',
            location: 'La Jolla'
        })
    })
    .then(function(beaches){
        console.log("favorite beach", beaches.get())
    }).catch(function(err){
        console.log(err)
    })



});

module.exports = app
