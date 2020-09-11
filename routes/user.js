const express = require("express");
const userrouting = express.Router();
const jwt = require("jsonwebtoken");
const userService = require("../service/user")
const uservalidator = require('../utilities/uservalidator')
const config = require('config')



userrouting.post("/signup",uservalidator,async(req,res,next)=>{
  
 
  try {
    response = await userService.signUp(req.body)
    if(response){
    res.status(201).json({message:"account successfully created plz login to see features"})
  }
}
  catch (error) {
    next(error)
  }
  
})


userrouting.post("/login", async(req, res, next) => {
    
    try {
      response = await userService.login(req.body)
     
    if(response){
      const payload = {
                         user: {
                           id: response.id,
                         }
                       }
      jwt.sign(
        payload,
       config.get('jwtSecret'),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
    } catch (error) {
      next(error)
    }
  });

  

module.exports = userrouting;
