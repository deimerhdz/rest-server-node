const { response, request } = require("express");
const { User, Category, Product } = require("../models");
const {ObjectId} = require('mongoose').Types;
const allowedCollections = [
    'users',
    'categories',
    'products'
];

const searchUsers = async(term='',res=response)=>{
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
       const user = await User.findById(term);
       return  res.json({
            results:(user)? [user] : []
        });
    }
    const regex = new RegExp(term,'i')
    const users = await User.find({
        $or:[
            {name:regex},
            {email:regex}
        ],
        $and:[{status:true}]
    })
    res.json({
        results: users
    });
}

const searchCategory = async(term='',res=response)=>{
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
       const category = await Category.findById(term);
       return  res.json({
            results:(category)? [category] : []
        });
    }
    const regex = new RegExp(term,'i')
    const categories = await Category.find( {name:regex,status:true})
    res.json({
        results: categories
    });
}
const searchProduct = async(term='',res=response)=>{
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
       const product = await Product.findById(term).populate('category','name');
       return  res.json({
            results:(product)? [product] : []
        });
    }
    const regex = new RegExp(term,'i')
    const products = await Product.find( {name:regex,status:true}).populate('category','name');
    res.json({
        results: products
    });
}

const search =async (req=request,res=response)=>{
    const {collection,term}= req.params;
    if(!allowedCollections.includes(collection)){
        return res.status(400).json({
         msg:`allowed collections are ${allowedCollections}`
        })
    }
    switch (collection) {
        case 'users':
            searchUsers(term,res);
            break;
        case 'categories':
            searchCategory(term,res);
            break;
        case 'products':
            searchProduct(term,res);
            break;
        default:
            res.status(500).json({
                msg:'you forgot to do this search'
            })
    }
}

module.exports= {
    search
}