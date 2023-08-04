const mongoose= require('mongoose')
//define shape of the document
const productSchema =  new mongoose.Schema({
    productName: String, // String is shorthand for {type: String}
    productPrice: String,
    productDescription: String,
    productImage: {type: String, default: 'https://thumbs.dreamstime.com/b/guitar-16517374.jpg' },
  });
  const Product = mongoose.model('Product', productSchema);

  
module.exports = Product