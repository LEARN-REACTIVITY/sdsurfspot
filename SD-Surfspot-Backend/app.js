var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator')
var app = express();
let User = require('./models').User
let Beach = require('./models').Beach

app.use(express.static('public'))
app.use(validator())
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
})

app.post('/users', (req, res) => {
    req.checkBody('name', 'Is required').notEmpty()
    req.checkBody('username', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()
    req.checkBody('email', 'Is required').notEmpty()

    req.getValidationResult()
    .then((validationErrors)=> {
        if (validationErrors.isEmpty()) {
            User.create({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }).then((user) => {
                res.status(201)
                res.json({
                    message: 'success',
                    user: user
                })
            })
        } else {
            res.status(400)
            res.json({errors: {validations: validationErrors.array()}})
        }
    }).catch((error)=>{
        response.status(400)
        response.json({
            message: "Unable to create User"
        })
    })
})

module.exports = app


/*

SELECT * FROM user_beaches
WHERE beach_id = $1
AND check_out IS NULL;

*/
