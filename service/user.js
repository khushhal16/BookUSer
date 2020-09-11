const bcrypt = require("bcrypt");

const User=require('../model/user')
var userService = {};
generateUserId = async()=>{
   
    try {
        let uIds =  await User.distinct("userId")
        if(uIds.length===0)
        return 1
        let newId= Math.max(...uIds)
        return newId+1
    } catch (error) {
        console.log(error.message)
        throw error
    }

    }

userService.signUp = async(userObj) => {
     userObj.userId=await generateUserId()
    const {name,eMail,passWord,userId} = userObj
    
    try {
        let user = await User.findOne({eMail:userObj.eMail})
      
    if(user){
      error = new Error("Email already exists")
      error.status=401
      throw error;
    }
   user = new User({
  userId,name,eMail,passWord
   })
   const salt = await bcrypt.genSalt(10);
   user.passWord = await bcrypt.hash(passWord, salt);
   user_saved = await user.save()
   return true
    } catch (error) {
        throw error
    }
  };
  

  

  userService.login = async(userObj) => {
    
    let user = await User.findOne({eMail:userObj.eMail})
    try {
      if(!user){
        error = new Error("Invalid email user doesn't exist plz signup")
        error.status=401
        throw error;
      }
      const isMatch = await bcrypt.compare(userObj.passWord, user.passWord);
      if(!isMatch){
          error = new Error("Invalid password plz enter correct password")
         error.status=401
         throw error;
      }
      return user
    } catch (error) {
      throw error
    }
   

  };

  userService.getUser = async(userId)=>{
     
  try {
    let user= await User.findOne({_id:userId})
    
    return user
  } catch (error) {
     throw error
  }
  }


  module.exports = userService