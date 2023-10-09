const {Role,User,Category, Product} = require('../models');

const isValidRole = async (role='')=>{
    const existsRole = await Role.findOne({role});
    if(!existsRole){
        throw new Error(`The role ${role} is not defined on database`)
    }
}

const existEmail = async (email='')=>{
    const existeEmail = await User.findOne({email});
    if(existeEmail){
        throw new Error(`Email is already exists`)
    }
}

const existUserById = async (id='')=>{
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The id does not exists`)
    }
}
const existCategoryById = async (id='')=>{
    const existCategory = await Category.findById(id);
    if(!existCategory){
        throw new Error(`The id does not exists`)
    }
}

const existproductById = async (id='')=>{
    const existProduct = await Product.findById(id);
    if(!existProduct){
        throw new Error(`The id does not exists`)
    }
}

const existProduct = async (name='')=>{
    const product = await Product.findOne({name});
    if(product){
        throw new Error(`product is already exists`)
    }
}

const allowedCollection = (colleccion,allowedCollection=[])=>{
    const allowed = allowedCollection.includes(colleccion);
    if(!allowed){
        throw new Error(`Collection ${colleccion} is not allowed`)
    }
    return true;
}
module.exports = {
    isValidRole,
    existEmail,
    existUserById,
    existCategoryById,
    existproductById,
    existProduct,
    allowedCollection
}