const User = require('../model/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;  
const registerNewUser = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password= hashPassword
  const userExist = await User.exists({phoneNumber:req.body.phoneNumber})
  if(userExist){
      res.json({msg: "Phone Number already exists"})
  }else{
      const data = await User.create(req.body)
      if(data){
       res.json({msg: "User registered successfully"})
      }
  }
 
  }

 
 const loginUser=  async (req,res)=>{
// step 1 : check if PhoneNumber/fullName/email exists or not
  const data = await User.exists({phoneNumber: req.body.phoneNumber})
  //  data yes => check if password is correct : yes -> success no-> invalid password
  //  No => user dosesnot exist
// req.body.password

const isMatched = await bcrypt.compare(req.body.password, data.password);
console.log(isMatched)

  if(data){
    res.json({
    isLoggedIn: true,
    msg:  "success",
    id: data._id
    })
  }else{
    res.json({
      isLoggedIn: false,
      msg: "user doesnnot exist"
    })
  }

}


const getAllUser =  async (req,res)=>{
   const data = await User.find()
   if(data){
     res.json({
     userList: data
     })
   }
 }

 const getUserDetailsById = async (req,res)=>{
   const data = await User.findById(req.params.id)
   if(data){
     res.json({
     userList: data
     })
   }
 }
 
  module.exports = {registerNewUser,loginUser,getAllUser,getUserDetailsById}