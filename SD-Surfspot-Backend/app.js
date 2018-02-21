var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator')
var app = express();
let User = require('./models').User
let Beach = require('./models').Beach
let UB = require('./models').user_beaches
let path= require('path')


app.use(express.static('public'))
app.use(validator())
app.use(bodyParser.json())
app.use(cors())
app.use(staticFiles)

app.use(express.static(path.resolve(__dirname, '../surf-spot-frontend/build')));

const authorization = function(req, res, next) {
    const token = req.headers.authorization || req.query.authToken || req.body.authToken
    console.log("token is this: " + token)
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

app.get('/api/', (req, res) => {
  res.json({message: 'API Example App'})
})

app.get('/api/user',
authorization, function(req, res) {
    res.json({user: req.currentUser})
})

app.put('/api/user_beaches', authorization, (req, res) => {
    Beach.findOne({
        where: {name: req.body.name}
    }).then((beach) => {
        var user= req.currentUser
        user.addBeach(beach, { check_in: new Date() })
    }).then((thing) => {
        console.log(thing)
        res.json({
            message: "success"
        })
    }).catch((error) => {
        res.json({
            message: "authtoken authenticized, but cannot check in",
            error: error
        })
    })
})

app.put('/api/user_beaches/checkout', authorization, (req, res) => {
    Beach.findOne({
        where: {name: req.body.name}
    }).then((beach) => {
        var user = req.currentUser
        user.addBeach(beach, { check_in: null})
    }).then((thing) => {
        res.json({
            message: "success checked out"
        })
    }).catch((error) => {
        res.json({
            message: "authtoken authenticized, but cannot check out",
            error: error
        })
    })
})

app.get('/api/checkin/:id', (req,res) => {
    let id = req.params.id
    Beach.findOne({
        where: {api_id: id}
    }).then((beach) => {
        let beachId = beach.id
        UB.sequelize.query(`SELECT * FROM user_beaches WHERE beach_id = ${beachId} AND check_in IS NOT NULL ORDER BY beach_id`).spread((results, metadata) => {
            res.json({
                results: results,
                metadata: metadata
            })
        })
    }).catch((error) => {
        res.status(400)
        res.json({
            errors: "problem getting check-in"
        })
    })
})

app.post('/api/getbeach', (req, res) => {
    var user = req.currentUser
    var id = req.body.id
    User.findOne({
        where: {id: id}
    }).then((user) => {
        var userId = user.id
        UB.sequelize.query(`SELECT * FROM user_beaches WHERE user_id = ${userId} AND check_in IS NOT NULL`).spread((results, metadata) => {

            if(results.length > 0) {
                var beachId = results[0].beach_id
                Beach.findOne({
                    where: {id: beachId}
                }).then((beach) => {
                    res.json({
                        beach: beach,
                        message: `User is checked into ${beach.name}`
                    })
                }).catch((error) => {
                    res.status(400)
                    res.json({
                        error: error,
                        message: "Problem getting beach."
                    })
                })
            } else {
                res.json({
                    results: false
                })
            }
        })
    }).catch((error) => {
        res.status(400)
        res.json({
            errors: error,
            message: "Problem getting user_beaches and checkin."
        })
    })
})

app.post('/api/login', (req, res) => {
    req.checkBody('username', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()

    req.getValidationResult()
    .then((validationErrors) => {
        if(validationErrors.isEmpty()) {
            User.findOne({
                where: {username: req.body.username}
            }).then((user) => {
                if(user && user.verifyPassword(req.body.password)) {
                    var userId = user.id
                    UB.sequelize.query(`SELECT * FROM user_beaches WHERE user_id = ${userId} AND check_in IS NOT NULL`).spread((result, metadata) => {
                        if(result.length > 0) {
                            var beachId = result[0].beach_id
                            Beach.findOne({
                                where: {id: beachId}
                            }).then((beach) => {
                                res.json({
                                    beach: beach,
                                    message: `User is checked into ${beach.name}`,
                                    user: user
                                })
                            }).catch((error) => {
                                res.status(400)
                                res.json({
                                    error: error,
                                    message: "Problem getting beach."
                                })
                            })
                        } else {
                            res.json({
                                message: "not checked into a beach, but login successful",
                                result: false,
                                user: user
                            })
                        }

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

app.post('/api/users', (req, res) => {
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


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../surf-spot-frontend/build', 'index.html'));
});



module.exports = app

/*

SELECT * FROM user_beaches
WHERE beach_id = $1
AND check_out IS NULL;

*/

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

// app.post('/getbeach', (req, res) => {
//     var user = req.currentUser
//     var id = req.body.id
//     User.findOne({
//         where: {id: id}
//     }).then((user) => {
//         var userId = user.id
//         UB.sequelize.query(`SELECT * FROM user_beaches WHERE user_id = ${userId} AND check_in IS NOT NULL`).spread((results, metadata) => {
//
//             if(results.length > 0) {
//                 var beachId = results[0].beach_id
//                 Beach.findOne({
//                     where: {id: beachId}
//                 }).then((beach) => {
//                     res.json({
//                         beach: beach,
//                         message: `User is checked into ${beach.name}`
//                     })
//                 }).catch((error) => {
//                     res.status(400)
//                     res.json({
//                         error: error,
//                         message: "Problem getting beach."
//                     })
//                 })
//             } else {
//                 res.json({
//                     results: false
//                 })
//             }
//         })
//     }).catch((error) => {
//         res.status(400)
//         res.json({
//             errors: error,
//             message: "Problem getting user_beaches and checkin."
//         })
//     })
// })
