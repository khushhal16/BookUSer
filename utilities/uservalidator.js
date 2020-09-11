module.exports = (req, res, next) => {
    const {name,eMail,passWord} = req.body
    
    if(!eMail.endsWith('.com') || !eMail.includes('@')){
       return res.status(401).json({ msg: "Plz enter valid email address" });
        
    }
    if(!name.match(/^[A-Za-z ]+$/) || name.trim(' ').length===0){
        return  res.status(401).json({ msg: "Plz enter valid name" });
        
    }
   if(passWord.length<6 || !(passWord.includes('@') || passWord.includes('$') || passWord.includes('#')) ){
    return res.status(401).json({ msg: "Plz enter valid password it must be of atleast 6 characters and should contain either of @ or # or $" });
    
   }
    next()
  
      
  };
  