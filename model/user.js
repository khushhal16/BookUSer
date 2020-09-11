const mongoose = require("mongoose");

let UserSchema =  new mongoose.Schema({
  userId:{
type:Number,
required:true,
unique:true
  },
  name: {
    type: String,
    required: true,
  },
  eMail: {
    type: String,
    required: true,
    unique: [true, "this email is already taken"],
  },
  passWord: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});



   

module.exports = mongoose.model('user',UserSchema)

