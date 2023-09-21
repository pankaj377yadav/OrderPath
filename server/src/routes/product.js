const User = require('../model/user')
const express=require('express')
const router=express.Router()
const ProductController = require('../controller/product')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/')
  },
  filename: function (req, file, cb) {
    const imageName = Math.floor(Math.random()*1000000) + file.originalname
    
    cb(null, imageName)
  }
})

const upload = multer({ storage: storage })
router.post('/product', upload.single('productImage'),ProductController.addNewProduct)
router.get('/product', ProductController.getAllProducts)
router.get('/product-image/:id', ProductController.getProductImage)

   module.exports = router