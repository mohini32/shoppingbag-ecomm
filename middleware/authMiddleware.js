const jwt=require('jsonwebtoken')
const usermodel=require('../models/usermodel')
require('dotenv').config();

const isLoggedIn=async(req,res,next)=>{
    try{
       // Check both cookies and Authorization header
       let token = req.cookies.token;

       // If no cookie token, check Authorization header
       if (!token) {
           const authHeader = req.headers.authorization;
           if (authHeader && authHeader.startsWith('Bearer ')) {
               token = authHeader.substring(7); // Remove 'Bearer ' prefix
           }
       }

       if(!token){
        return res.status(401).json({message:"Unauthorised"});
       }
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       const user=await usermodel.findOne({where:{id:decoded.id}});
       if(!user){
        return res.status(401).json({message:"unauthorised"});
       }
       req.user = user; // Attach user to request object
       next();
    }
    catch(error){
        return res.status(401).json({message:"unauthorised"});
    }
}

const isadmin=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"unauthorised"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await usermodel.findOne({where:{id:decoded.id}});
        if(!user){
            return res.status(401).json({message:"unauthorised"});
        }
        if(user.role!=='admin'){
            return res.status(401).json({message:"unauthorised"});
        }
        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({message:"unauthorised"});
    }
}
module.exports={isLoggedIn,isadmin};