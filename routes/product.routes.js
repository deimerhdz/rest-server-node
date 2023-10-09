const {Router}= require('express');
const { deleteProductById, updateProduct, saveProduct, getProductById, getAllProducts } = require('../controllers/product.controller');

const { validatorCreateProduct, validatorUpdateProduct, validatorDeleteProduct, validatorProductById } = require('../validators/products.validators');
const router =Router();

router.get('/',getAllProducts);

router.get('/:id',validatorProductById,getProductById);
router.post('/',validatorCreateProduct,saveProduct);
router.put('/:id',validatorUpdateProduct,updateProduct);
router.delete('/:id',validatorDeleteProduct,deleteProductById);

module.exports = router