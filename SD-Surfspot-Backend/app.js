var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator')
var app = express();
let User = require('./models').User
let Beach = require('./models').Beach
let UB = require('./models').user_beaches


app.use(express.static('public'))
app.use(validator())
app.use(bodyParser.json())
app.use(cors())

const authorization = function(req, res, next) {
    console.log(req.headers);

    const token = req.headers.authorization || req.query.authToken || req.body.authToken

    if(token) {
        User.findOne({
            where: {authToken: token}
        }).then((user)=> {
            if(user) {
                req.currentUser = user
                next()
            }else{
                res.status(401)
                res.json({message: 'Authorization Token Invalid'})
            }
        })
    } else {
        res.status(401)
        res.json({message: 'Authorization Token Required'})
    }
}

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
})

app.get('/user',
authorization, function(req, res) {
    res.json({user: req.currentUser})
})

app.put('/user_beaches', authorization, (req, res) => {
    Beach.findOne({
        where: {name: req.body.name}
    }).then((beach) => {
        var user= req.currentUser
        user.addBeach(beach, { check_in: new Date()})
    }).then((thing) => {
        console.log(thing)
        res.json({
            message: "success"
        })
    }).catch((error) => {
        res.json({
            message: "authtoken authenticized, but something else broken"
        })
    })
})

app.get('/checkin/:id', (req,res) => {
    let id = req.params.id

    UB.sequelize.query(`SELECT * FROM user_beaches WHERE beach_id = ${id} AND check_in IS NOT NULL ORDER BY beach_id`).spread((results, metadata) => {
        res.json({
            results: results,
            metadata: metadata
        })
    }).catch((error) => {
        res.status(400)
        res.json({
            errors: "problem getting check-in"
        })
    })
})

// app.post('/checkin', authorization, (req, res) => {
//     Beach.findOne({
//         where: {name: req.body.name}
//     }).then((beach) => {
//         var user= req.currentUser
//         user.getBeaches({
//             where: {
//                     id: beach.id
//                     }
//         })
//     }).then((checkedin) => {
//         res.json({
//             message: "it kinda worked",
//             checkedin: checkedin
//         })
//     }).catch((error) => {
//         res.json({
//             message: "cannot find check-ins",
//             errors: error
//         })
//     })
//
// })

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

/*

SELECT * FROM user_beaches
WHERE beach_id = $1
AND check_out IS NULL;

*/
