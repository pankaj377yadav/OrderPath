const User = require('../model/user')
const express=require('express')
const app=express.Router()
const UserController = require('../controller/user')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatar/')
    },
    filename: function (req, file, cb) {
      const imageName = Math.floor(Math.random() * 1000) + file.originalname
      cb(null,imageName )
    }
  })
  
  const upload = multer({ storage: storage })

 

app.post('/register', UserController.registerNewUser)

app.post('/login', UserController.loginUser)

app.post('/users-image/:id', upload.single('avatar'), UserController.uploadImage)

app.get('/users-image/:id', UserController.getUserImage)

app.get('/users', UserController.getAllUser)

app.get('/users/:id', UserController.getUserDetailsById)

app.put('/account/:id', UserController.updateUserDetailsById)



module.exports=app;