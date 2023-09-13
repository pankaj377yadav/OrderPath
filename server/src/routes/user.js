const User = require('../model/user')
const express=require('express')
const app=express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatar/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
const UserController = require('../controller/user')
 

app.post('/register', UserController.registerNewUser)

app.post('/login', UserController.loginUser)

app.post('/users/:id', upload.single('avatar'), UserController.uploadImage)


app.get('/users', UserController.getAllUser)

app.get('/users/:id', UserController.getUserDetailsById)

app.put('/account/:id', UserController.updateUserDetailsById)



module.exports=app;