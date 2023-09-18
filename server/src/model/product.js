const mongoose= require('mongoose')
//define shape of the document
const productSchema =  new mongoose.Schema({
    productName: String, // String is shorthand for {type: String}
    productPrice: String,
    productCategory: String,
    productDescription: String,
    productImage: String
  });
  const Product = mongoose.model('Product', productSchema);

  
module.exports = Product