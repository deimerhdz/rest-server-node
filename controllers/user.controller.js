const {response,request} = require('express')
const {User} = require('../models');
const bcrypt = require('bcryptjs');

const usersGet = async(req=request, res=response) => {
    const {limit=5,offset=0} = req.query;
    const query= {status:true};
    const [total,users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(offset))
        .limit(Number(limit))
    ])
    res.json({
        total,
        users,

    })
}
const usersPost = async (req, res=response) => {
  
    const {name,email,password,role} = req.body;
    const user = new User({name,email,password,role} );
    //encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);
    //guardar en db
    await user.save();
    res.status(201).json({
        user
    })
}
const usersPut = async(req, res=response) => {
    const {id} = req.params;
    const {_id,password,google,email,...requestBody} = req.body;
    if(password){
        const salt = bcrypt.genSaltSync(10);
        requestBody.password = bcrypt.hashSync(password,salt);

    }
    const user =await User.findByIdAndUpdate(id,requestBody,{new:true});
    res.json({
        user
    })
}
const usersDelete = async(req=request, res=response) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id,{status:false},{new:true});
    const userAuthenticated = req.user;
    res.json({
        user,
        userAuthenticated
    })
}
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}