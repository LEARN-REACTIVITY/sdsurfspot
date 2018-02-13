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

const authorization = function(request, response, next) {
    const token = request.query.authToken || request.body.authToken
    if(token) {
        User.findOne({
            where: {authToken: token}
        }).then((user)=> {
            if(user) {
                request.currentUser = user
                next()
            }else{
                response.status(401)
                response.json({message: 'Authorization Token Invalid'})
            }
        })
    } else {
        response.status(401)
        response.json({message: 'Authorization Token Required'})
    }
}

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
})

app.get('/user',
authorization, function(req, res) {
    res.json({user: req.currentUser})
})

app.post('/login', (req, res) => {
    req.checkBody('username', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()

    req.getValidationResult()
    .then((validationErrors) => {
        if(validationErrors.isEmpty()) {
            User.findOne({
                where: {username: req.body.username}
            }).then((user) => {
                if(user && user.verifyPassword(req.body.password)) {
                    res.json({
                        message: 'Success!',
                        user:user
                    })
                } else {
                    res.status(404)
                    res.json({
                        message: 'Invalid credentials',
                        errors: {serverValidations: 'invalid credentials'}
                    })
                }
            })
        } else {
            res.status(400)
            res.json({
                errors: {validations: validationErrors.array()}
            })
        }
    })
})

// app.post('/login', (req, res) => {
//     User.findOne({
//         where: {username: req.body.username}
//     }).then((user) => {
//         if(user && user.verifyPassword(req.body.password)) {
//             res.json({
//                 message: 'Success!',
//                 user:user
//             })
//         }else{
//             res.status(404)
//             res.json({
//                 message: 'Invalid credentials',
//                 errors: {error: 'invalid credentials'}
//             })
//         }
//     })
// })

app.post('/users', (req, res) => {
    req.checkBody('name', 'Is required').notEmpty()
    req.checkBody('username', 'Is required').notEmpty()
    req.checkBody('email', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()

    req.getValidationResult()
    .then((validationErrors)=> {
        if (validationErrors.isEmpty()) {
            User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).then((user) => {
                res.status(201)
                res.json({
                    message: 'success',
                    user: user
                })
            }).catch((error) => {
                res.status(409)
                res.json({
                    message: "unable to create User",
                    errors: {serverValidations: error.errors}
                })
            })
        } else {
            res.status(400)
            res.json({
                errors: {validations: validationErrors.array()}
            })
        }
    })
})



module.exports = app
// app.post('/users', (req, res) => {
//     User.create(
//         {
//             name: req.body.name,
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         }
//     ).then((user)=>{
//         res.json({
//             message: 'success',
//             user: user
//         })
//     }).catch((error)=>{
//         res.status(400)
//         res.json({
//             message: "Unable to create User",
//             errors: error.errors
//         })
//     })
// })

// app.post('/users', (req, res) => {
//     User.create({
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }).then((user) => {
//         res.json({
//             message: 'success',
//             user: user
//         })
//     })
// })

/*

SELECT * FROM user_beaches
WHERE beach_id = $1
AND check_out IS NULL;

*/
