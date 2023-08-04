const express=require('express')
const app=express.Router()
const UserController = require('../controller/user')
app.post('/register', UserController.registerNewUser)
app.post('/login', UserController.loginUser)
app.get('/users', UserController.getAllUser)
app.get('/users/:id', UserController.getUserDetailsById)


module.exports=app;