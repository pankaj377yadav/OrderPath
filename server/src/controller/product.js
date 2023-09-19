const Product = require('../model/product')


const addNewProduct = async (req, res) => {
  req.body.productImage = req.file?.filename
 const data = await Product.create(req.body)
 if(data) {
  res.json({
    msg: "product add success"
  })
}
    }

  const getAllProducts = async (req, res) => {
    const data = await Product.find()
    res.json({productList: data})
      }

module.exports = {addNewProduct,getAllProducts}