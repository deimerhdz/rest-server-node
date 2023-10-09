const { response, request } = require("express");
const { Product } = require("../models");

const getAllProducts = async(req=request,res=response)=>{
    const {limit=5,offset=0} = req.query;
    const query ={
        status:true
    }
    const [total,products]= await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .skip(Number(offset))
        .limit(Number(limit))
        .populate('user','name')
        .populate('category','name')
    ])

     res.json({total,products});

}

const getProductById = async(req=request,res=response)=>{
    const {id}= req.params;
    const product = await Product.findById(id)
    .populate('user','name')
    .populate('category','nombre');

    res.json(product)
}

const saveProduct = async(req=request,res=response)=>{
    const {user,status,...data}= req.body;
    data.user=req.user._id;
    data.name = data.name.toUpperCase();
    const product = new Product(data);
    await product.save();
    res.json(product);
}

const updateProduct = async(req=request,res=response)=>{
    const {id}= req.params;
    const {status,user,...data}= req.body;
    data.user=req.user._id;
    const productDB= await Product.findByIdAndUpdate(id,data,{new:true})
    res.json(productDB);
}

const deleteProductById=async(req=request,res=response)=>{
    const {id}=req.params;
    const productDB = await Product.findByIdAndUpdate(id,{status:false},{new:true})
    res.json(productDB);
}

module.exports = {
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProductById
}