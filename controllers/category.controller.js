const { request, response } = require("express");
const {Category} = require('../models');
const getAllCategories = async(req=request,res=response)=>{
    const {limit=5,offset=0}= req.query;
    const query={
        status:true
    }
    const [total,categories]= await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .skip(Number(offset))
        .limit(Number(limit))
        .populate('user','name')
    ]);

    res.json({
        categories,
        total
    });
}

const getCategoryById = async(req=request,res=response)=>{
    const {id} = req.params;
    const category = await Category.findById(id).populate('user','name');
    res.json(category);
}

const saveCategory =async(req=request,res=response)=>{
    const name = req.body.name.toUpperCase();
    const data = {
        name,
        user:req.user._id
    }
    const category = new Category(data);
    await category.save();
    res.status(201).json(category)
}


const updatedCategory =async(req=request,res=response)=>{
    const {id}= req.params;
    const {status,user,...data} = req.body;
    data.name =  data.name.toUpperCase();
    data.user = req.user._id;
    const categoryDB= await Category.findByIdAndUpdate(id,data,{new:true});
    res.json(categoryDB);
}

const deleteCategoryById =async(req=request,res=response)=>{
    const {id}= req.params
    const categoryDB= await Category.findByIdAndUpdate(id,{status:false},{new:true});
    res.json(categoryDB);
}


module.exports = {
    getAllCategories,
    getCategoryById,
    saveCategory,
    updatedCategory,
    deleteCategoryById

}