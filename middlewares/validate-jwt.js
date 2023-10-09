const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validarJWT= async(req=request,res=response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'There is not token in request'
        });
    }
    try{
      const{ uid} = jwt.verify(token,process.env.SECRET_KEY);
      const user = await User.findById(uid);
      //vefiry if uid have status true
      if(!user.status|| !user){
        return res.status(401).json({
            msg:'token invalid'
        })
      }
      
      req.user=user;
      next();
    }catch(err){
        
        console.log(err);
        res.status(401).json({
            msg:'token invalid'
        })
    }
   

}

module.exports = {
    validarJWT
}