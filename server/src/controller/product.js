const Product = require('../model/product')
const User = require("../model/user")
const fs = require('fs');
const path = require('path');


const getAllProducts = async (req,res)=>{
    const data = await Product.find()
    res.json({
      productList:data
    })
  }

 const addNewProduct=  async (req,res)=>{
    const data = await Product.create(req.body)
    if(data) {
      res.json({
        msg: "product add success"
      })
    }
  }

  const uploadImage = async(req, res) =>{
    // save the file name that multer has uploded
    if(req.file?.filename){
      await Product.findByIdAndUpdate(req.params.id,  {$set: {productImage: req.file?.filename}})
    }
    res.json({
      msg:"image upload"
    })
  }
  
  
  const getproductImage = async(req, res) =>{
   try{
    const productInfo = await Product.findById(req.params.id)
    // console.log(productInfo)
    const imagePath = path.join(__dirname, "../../uploads/productImg", productInfo.productImage)
    const defaultimagePath = path.join(__dirname, "../../uploads/avatar", "default img.png")
  
    if(fs.existsSync(imagePath)){
      res.sendFile(imagePath)
    }else{
  res.sendFile(defaultimagePath)
    }
  }catch(err){
  console.log(err)
  }
   }


  module.exports = {getAllProducts, addNewProduct, uploadImage, getproductImage }