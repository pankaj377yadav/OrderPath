const mongoose= require('mongoose')

const userSchema =  new mongoose.Schema({
  fullName: {type: String},
  phoneNumber: {type: String, required:true, unique:true}, 
  email: {type: String}, 
  password:  {type: String,}, 
  role: {type: String, default:"User"},
  status: {type: String, default:"pending"},
  avatarImage: String,
  
  });
  const User = mongoose.model('User', userSchema);

  
module.exports = User