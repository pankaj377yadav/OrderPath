const Product = require('../model/product')
const express=require('express')
const app=express.Router()
const ProductController = require('../controller/product')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/productImg/')
    },
    filename: function (req, file, cb) {
      const imageName = Math.floor(Math.random() * 1000) + file.originalname
      cb(null,imageName )
    }
  })
  
  const upload = multer({ storage: storage })
  

app.post('/product', ProductController.addNewProduct)

app.get('/product', ProductController.getAllProducts)

app.post('/product-image/:id', upload.single('productImg'), ProductController.uploadImage)

app.get('/product-image/:id', ProductController.getproductImage)


module.exports=app;