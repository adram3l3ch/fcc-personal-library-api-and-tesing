const mongoose = require("mongoose")

const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.DB)
    console.log("Connected to database successfully")
  }catch(error){
    console.log(error)
  }
}

module.exports = connectDB