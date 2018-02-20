'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();
var User = require('./models').User;
var Beach = require('./models').Beach;
var UB = require('./models').user_beaches;

app.use(express.static('public'));
app.use(validator());
app.use(bodyParser.json());
app.use(cors());

var authorization = function authorization(req, res, next) {
    var token = req.headers.authorization || req.query.authToken || req.body.authToken;
    console.log("token is this: " + token);
    if (token) {
        User.findOne({
            where: { authToken: token }
        }).then(function (user) {
            if (user) {
                req.currentUser = user;
                next();
            } else {
                res.status(401);
                res.json({ message: 'Authorization Token Invalid' });
            }
        });
    } else {
        res.status(401);
        res.json({ message: 'Authorization Token Required' });
    }
};

app.get('/', function (req, res) {
    res.json({ message: 'API Example App' });
});

app.get('/user', authorization, function (req, res) {
    res.json({ user: req.currentUser });
});

app.put('/user_beaches', authorization, function (req, res) {
    Beach.findOne({
        where: { name: req.body.name }
    }).then(function (beach) {
        var user = req.currentUser;
        user.addBeach(beach, { check_in: new Date() });
    }).then(function (thing) {
        console.log(thing);
        res.json({
            message: "success"
        });
    }).catch(function (error) {
        res.json({
            message: "authtoken authenticized, but cannot check in",
            error: error
        });
    });
});

app.put('/user_beaches/checkout', authorization, function (req, res) {
    Beach.findOne({
        where: { name: req.body.name }
    }).then(function (beach) {
        var user = req.currentUser;
        user.addBeach(beach, { check_in: null });
    }).then(function (thing) {
        res.json({
            message: "success checked out"
        });
    }).catch(function (error) {
        res.json({
            message: "authtoken authenticized, but cannot check out",
            error: error
        });
    });
});

app.get('/checkin/:id', function (req, res) {
    var id = req.params.id;
    Beach.findOne({
        where: { api_id: id }
    }).then(function (beach) {
        var beachId = beach.id;
        UB.sequelize.query('SELECT * FROM user_beaches WHERE beach_id = ' + beachId + ' AND check_in IS NOT NULL ORDER BY beach_id').spread(function (results, metadata) {
            res.json({
                results: results,
                metadata: metadata
            });
        });
    }).catch(function (error) {
        res.status(400);
        res.json({
            errors: "problem getting check-in"
        });
    });
});

app.post('/getbeach', function (req, res) {
    var user = req.currentUser;
    var id = req.body.id;
    User.findOne({
        where: { id: id }
    }).then(function (user) {
        var userId = user.id;
        UB.sequelize.query('SELECT * FROM user_beaches WHERE user_id = ' + userId + ' AND check_in IS NOT NULL').spread(function (results, metadata) {

            if (results.length > 0) {
                var beachId = results[0].beach_id;
                Beach.findOne({
                    where: { id: beachId }
                }).then(function (beach) {
                    res.json({
                        beach: beach,
                        message: 'User is checked into ' + beach.name
                    });
                }).catch(function (error) {
                    res.status(400);
                    res.json({
                        error: error,
                        message: "Problem getting beach."
                    });
                });
            } else {
                res.json({
                    results: false
                });
            }
        });
    }).catch(function (error) {
        res.status(400);
        res.json({
            errors: error,
            message: "Problem getting user_beaches and checkin."
        });
    });
});

app.post('/login', function (req, res) {
    req.checkBody('username', 'Is required').notEmpty();
    req.checkBody('password', 'Is required').notEmpty();

    req.getValidationResult().then(function (validationErrors) {
        if (validationErrors.isEmpty()) {
            User.findOne({
                where: { username: req.body.username }
            }).then(function (user) {
                if (user && user.verifyPassword(req.body.password)) {
                    var userId = user.id;
                    UB.sequelize.query('SELECT * FROM user_beaches WHERE user_id = ' + userId + ' AND check_in IS NOT NULL').spread(function (result, metadata) {
                        if (result.length > 0) {
                            var beachId = result[0].beach_id;
                            Beach.findOne({
                                where: { id: beachId }
                            }).then(function (beach) {
                                res.json({
                                    beach: beach,
                                    message: 'User is checked into ' + beach.name,
                                    user: user
                                });
                            }).catch(function (error) {
                                res.status(400);
                                res.json({
                                    error: error,
                                    message: "Problem getting beach."
                                });
                            });
                        } else {
                            res.json({
                                message: "not checked into a beach, but login successful",
                                result: false,
                                user: user
                            });
                        }
                    });
                } else {
                    res.status(404);
                    res.json({
                        message: 'Invalid credentials',
                        errors: { serverValidations: 'invalid credentials' }
                    });
                }
            });
        } else {
            res.status(400);
            res.json({
                errors: { validations: validationErrors.array() }
            });
        }
    });
});

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
            }).catch(function (error) {
                res.status(409);
                res.json({
                    message: "unable to create User",
                    errors: { serverValidations: error.errors }
                });
            });
        } else {
            res.status(400);
            res.json({
                errors: { validations: validationErrors.array() }
            });
        }
    });
});

module.exports = app;

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