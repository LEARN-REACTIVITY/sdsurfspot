var express = require('express');
var bodyParser = require('body-parser')
var app = express();


let User = require('./models').User
let Beach = require('./models').Beach
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
})
//
// User.create({
//     name:'Bob',
//     userName: 'bobo123',
//     email: 'iambob@gmail.com',
//     friends: 1}).then(function(user){
//         console.log(user.get);
//         return user.createBeach({
//             beach: 'cardiff',
//             location: 'La Jolla'
//         })
//     })
//     .then(function(beaches){
//         console.log("favorite beach", beaches.get())
//     }).catch(function(err){
//         console.log(err)
//     })
//
// });

Beach.create({
    name: 'cardiff',
    location: 'la jolla'
}).then(function(beach) {
    console.log(beach);
    return beach.createUser({
        name: "bob",
        userName: 'bobo123',
        email: 'iambob@gmail.com',
        friends: 1
    })
}).then(function(user) {
    console.log(success)
}).catch(function(err) {
    console.log(error)
})
module.exports = app
//








// User.create({
//     name:'Bob',
//     userName: 'bobo123',
//     email: 'iambob@gmail.com',
//     friends: 1}).then(function(user){
//         console.log(user.get);
//         return user.createBeach({
//             beach: 'cardiff',
//             location: 'La Jolla'
//         })
//     })
//     .then(function(beaches){
//         console.log("favorite beach", beaches.get())
//     }).catch(function(err){
//         console.log(err)
//     })


/*

SELECT * FROM user_beaches
WHERE beach_id = $1
AND check_out IS NULL;

*/
