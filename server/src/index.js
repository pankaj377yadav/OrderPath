const express = require('express')
require('dotenv').config()
const app = express()
const cors =require('cors')
app.use(express.json())
app.use(cors())
const connectDb = require('./dbConnect/connection')
const productRoute=require('./routes/product')
const vehicleRoute=require('./routes/vehicle')
const userRoute=require('./routes/user')


connectDb()
app.use("/",productRoute)
app.use("/", userRoute)
app.use("/", vehicleRoute)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

