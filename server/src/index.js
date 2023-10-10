const express = require('express')
require('dotenv').config()
const app = express()
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server,  {
  cors: {
    origin: "*",
  }
});
const cors =require('cors')
app.use(express.json())
app.use(cors())

const connectDb = require('./dbConnect/connection')
const productRoute=require('./routes/product')
const vehicleRoute=require('./routes/vehicle')
const userRoute=require('./routes/user')
const Rides = require("./model/rides")


connectDb();
io.on('connection', (socket) => {

  socket.on('rides', async(rides)=>{
    await Rides.create(rides)
    const data = await Rides.find({status: "pending"}).populate('user')
    console.log(data)
    io.emit("rides", data);
  })

});
app.use("/",productRoute)
app.use("/", userRoute)
app.use("/", vehicleRoute)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

