const jwt = require("jsonwebtoken");
const JWT_SECRET = "aSecretKey";

const fetchuser=(req,res,next)=>{
  //get the user from jwt token and add id to req of object 
  const token=req.header('auth-token');
  if(!token){
    return res.status(401).send({error:"invalid token"})
  }
  try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();


  }
  catch(error){
    return res.status(401).send({error:"invalid token"})
  }
}

module.exports=fetchuser;

