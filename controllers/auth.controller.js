const { request, response } = require("express");
const {User} = require('../models');
const bcrypt = require('bcryptjs');
const { generateJwt } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const login =async(req=request,res=response)=>{
    try {
        const {email,password}= req.body;
        //verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                mgs:'Invalid user or password '
            })
        }
        //verificar si el usuario esta activo
        if(!user.status){
            return res.status(400).json({
                mgs:'Invalid user or password '
            })
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                mgs:'Invalid user or password '
            })
        }
        //generar jwt
        const jwt = await generateJwt(user.id);
        res.json({
            user,
            jwt
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mgs:'Hable con el administrador'
        })
    }

}

const googleSignIn =async(req,res)=>{

    try {
        const {id_token} = req.body;
        const {name,img,email} = await googleVerify(id_token)
        
        let user = await User.findOne({email});
        if(!user){
            const data = {
                name,
                email,
                password:':p',
                img,
                google:true,
                role:'USER_ROLE'
            }
            user = new User(data);
            await user.save();
        }

        if(!user.status){
            return res.status(401).json({
                msg:'talk to admin - user disabled'
            })
        }
        //generar jwt
        const jwt = await generateJwt(user.id);
        res.json({
            user,
            jwt
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'token could not be verified'
        })
    }
   
}


module.exports = {
    login,
    googleSignIn
}