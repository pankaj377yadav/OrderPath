const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId , ref:'User'},
  estimatedPrice: {type:Number, required: true},
  password: String,
  selectedVehicle: mongoose.Schema.Types.ObjectId,
  stopInputAddress: String,
  destinationInputAddress: String, 
  pickInputAddress: String,
  priceChangeCount: Number,
  currentInputPos: Object,
  currentDestinationPos: Object,
  phoneNumber: String
},{
  timestamps: true
});

const Rides = mongoose.model("Rides", ridesSchema);
module.exports = Rides;
