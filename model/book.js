const mongoose = require("mongoose");


let BookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  bookId: {
    type: Number,
    required: true,
    unique:true
  },
  bName: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  category:{
      type: String,
      required:true
  },
  image: 
  { 
    type:String,
    required:true
  }
});

module.exports = mongoose.model('book',BookSchema)