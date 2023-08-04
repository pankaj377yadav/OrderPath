const mongoose = require('mongoose');
const connectDb = async() => {
    const connect = await mongoose.connect('mongodb://127.0.0.1:27017/guitarshopdb');
    if(connect){
      console.log("connected to mongodb")
    }else{
      console.log("db connection failed")
    }
  }

module.exports = connectDb