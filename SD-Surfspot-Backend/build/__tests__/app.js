'use strict';

var request = require('supertest');
var app = require('../app');

// jest.mock('../models/users')

describe("App", function () {
    it("Tests the root path", function () {
        return request(app).get("/").then(function (response) {
            expect(response.statusCode).toBe(200);
        });
    });
});

it("Validates name when creating user", function () {
    return request(app).post("/users").send({
        username: "johndo",
        password: "johndo",
        email: "johndo@gmail.com"
    }).then(function (response) {
        expect(response.statusCode).toBe(400);
        var error = response.body.errors.validations[0];
        expect(error.param).toBe('name');
        expect(error.msg).toBe('Is required');
    });
});

it("Validates username when creating user", function () {
    return request(app).post("/users").send({
        name: "John",
        password: "johndo",
        email: "johndo@gmail.com"
    }).then(function (response) {
        expect(response.statusCode).toBe(400);
        var error = response.body.errors.validations[0];
        expect(error.param).toBe('username');
        expect(error.msg).toBe('Is required');
    });
});

it("Validates email when creating user", function () {
    return request(app).post("/users").send({
        name: "John",
        username: "johndo",
        password: "johndo"
    }).then(function (response) {
        expect(response.statusCode).toBe(400);
        var error = response.body.errors.validations[0];
        expect(error.param).toBe('email');
        expect(error.msg).toBe('Is required');
    });
});