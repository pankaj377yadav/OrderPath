const Product = require('../model/product')
const express=require('express')
const app=express.Router()
const ProductController = require('../controller/product')


app.post('/product', ProductController.addNewProduct)

app.get('/product', ProductController.getAllProducts)




module.exports=app;