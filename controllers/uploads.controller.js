const path = require('path');
const fs = require('fs');
const { response, request } = require('express');
const {uploadFile}= require('../helpers');
const { User, Product } = require('../models');
const { log } = require('console');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async(req,res)=>{
   try{
    const path = await uploadFile(req.files,undefined,'imgs');
    res.json({
        msg:'file uploaded to'+path
    })
   }catch(err){
    res.status(400).json({
        mgs:err
    })
   }
}

const updatedImage =async (req=request,res=response)=>{
const {id,collection} = req.params;
    let model;
    switch (collection) {
        case 'users':
            model= await User.findById(id);
                if(!model){
                    return res.status(400).json({
                        msg:'does not exist user with id'
                    })
                }
            break;
        case 'products':
             model= await Product.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:'does not exist product with id'
                    })
                }
            break;
        default:
            return res.status(500).json({msg:'You forgot validate this'})
    }
    if(model.img){
        const pathImg = path.join(__dirname,'../uploads',collection,model.img);
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);
        }
    }
    const filePath = await uploadFile(req.files,undefined,collection);
    model.img = filePath
    await model.save();
    res.json(model);
}

const updatedImageCloudinary =async (req=request,res=response)=>{
    const {id,collection} = req.params;
        let model;
        switch (collection) {
            case 'users':
                model= await User.findById(id);
                    if(!model){
                        return res.status(400).json({
                            msg:'does not exist user with id'
                        })
                    }
                break;
            case 'products':
                 model= await Product.findById(id);
                    if(!modelo){
                        return res.status(400).json({
                            msg:'does not exist product with id'
                        })
                    }
                break;
            default:
                return res.status(500).json({msg:'You forgot validate this'})
        }
        if(model.img){
            const nameArr = model.img.split('/');
            const name = nameArr[nameArr.length-1];
            const [public_id] = name.split('.');
            cloudinary.uploader.destroy(public_id);
          
        }
        const {tempFilePath}= req.files.file;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        model.img = secure_url
        await model.save();
        
        res.json(model);
    }
    

const showImage = async (req=request,res=response)=>{
    const {id,collection}= req.params;
    let model;
    switch (collection) {
        case 'users':
            model= await User.findById(id);
                if(!model){
                    return res.status(400).json({
                        msg:'does not exist user with id'
                    })
                }
            break;
        case 'products':
             model= await Product.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg:'does not exist product with id'
                    })
                }
            break;
        default:
            return res.status(500).json({msg:'You forgot validate this'})
    }
    if(model.img){
        const pathImg = path.join(__dirname,'../uploads',collection,model.img);
        if(fs.existsSync(pathImg)){
         return   res.sendFile(pathImg)
        }
    }
    const pathImg = path.join(__dirname,'../assets/no-image.jpg');

    res.sendFile(pathImg);


}   
module.exports = {
    cargarArchivo,
    updatedImage,
    showImage,
    updatedImageCloudinary
}

