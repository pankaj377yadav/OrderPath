const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const saltRounds = 10;

const registerNewUser = async (req, res) => {
  const { fullName, password, email, phoneNumber } = req.body;

  const hashPassword = await bcrypt.hash(password, saltRounds);
  const userExist = await User.exists({ phoneNumber: phoneNumber });
  if (userExist) {
    res.status(409).json({ msg: "Phone Number already exists !" });
  } else {
    const data = await User.create({
      fullName,
      password: hashPassword,
      phoneNumber,
      email,
    });
    if (data) {
      res.json({ msg: "User registered successfully !" });
    }
  }
};



const loginUser = async (req, res) => {
const {phoneNumber,password} = req.body

  // const data = await User. findOne(phoneNumber);
  
  // to find by email or phoneNumber
  const data = await User.findOne({ $or: [{ email: phoneNumber }, {phoneNumber: phoneNumber }] });

  if (!data) {
    return res.status(404).json({ msg: "User doesn't exist !" });
  } else {
    const isMatched = await bcrypt.compare(password, data.password);
    if (isMatched) {
      const token = await jwt.sign({phoneNumber}, process.env.SECRET_KEY);
      res.json({isLoggedIn:true, "msg": "Login Success !",token, userInfo:data });
      // console.log(token)
    } else {
      res.status(404).json({ msg: "Invalid Password !" });
    }
  }

  // // step 1 : check if PhoneNumber/fullName/email exists or not
  //   const data = await User.findOne({phoneNumber: req.body.phoneNumber})
  // const {password} =data
  //   //  data yes => check if password is correct : yes -> success no-> invalid password
  //   //  No => user dosesnot exist
  // // req.body.password
  // const isMatched = await bcrypt.compare(req.body.password,password)

  //   if(data && isMatched){
  //     // const token = jwt.sign({phoneNumber: req.body.phoneNumber}, process.env.SECRET_KEY);
  //     // console.log(token)

  //     res.json({
  //     isLoggedIn: true,
  //     msg:  "success",
  //     id: data._id
  //     })
  //   }else{
  //     res.json({
  //       isLoggedIn: false,
  //       msg: "user doesnnot exist"
  //     })
  //   }
};

const getAllUser = async (req, res) => {
  const data = await User.find();
  if (data) {
    res.json({
      userList: data,
    });
  }
};

const getUserDetailsById = async (req, res) => {
  const data = await User.findById(req.params.id);
  if (data) {
    res.json({
      userDetails: data,
    });
  }
};

const updateUserDetailsById= async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body);
  if (data) {
    res.json({
      msg: "User details edited"
    });
  }
};


const uploadImage = async(req, res) =>{
  res.json({
    msg:"image upload"
  })
}

module.exports = { registerNewUser, loginUser, getAllUser, getUserDetailsById, updateUserDetailsById, uploadImage };
