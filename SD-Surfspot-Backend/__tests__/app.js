const request = require('supertest')
const app = require('../app')

// jest.mock('../models/users')

describe("App", ()=>{
    it("Tests the root path",()=>{
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
        })
    })
})


it("Validates name when creating user", ()=>{
    return request(app)
    .post("/users")
    .send({
        username: "johndo",
        password: "johndo",
        email: "johndo@gmail.com"
    })
    .then(response => {
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('name')
        expect(error.msg).toBe('Is required')
    })
})

it("Validates username when creating user", ()=>{
    return request(app)
    .post("/users")
    .send({
        name: "John",
        password: "johndo",
        email: "johndo@gmail.com"
    })
    .then(response => {
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('username')
        expect(error.msg).toBe('Is required')
    })
})

it("Validates email when creating user", ()=>{
    return request(app)
    .post("/users")
    .send({
        name: "John",
        username: "johndo",
        password: "johndo"
    })
    .then(response => {
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('email')
        expect(error.msg).toBe('Is required')
    })
})
