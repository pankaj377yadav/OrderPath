const mongoose= require('mongoose')

const userSchema =  new mongoose.Schema({
  fullName: {type: String},
  phoneNumber: {type: String}, 
  email: {type: String}, 
  password:  {type: String}, 
  status: {type: String, default:"pending"},
  role: {type: String, default:"User"}
  });
  const User = mongoose.model('User', userSchema);

  
module.exports = User