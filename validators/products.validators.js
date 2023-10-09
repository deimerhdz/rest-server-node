const {check}= require('express-validator');
const { validateFields, validarJWT } = require('../middlewares');
const { existProduct, existproductById } = require('../helpers');

const validatorCreateProduct = [
    validarJWT,
    check('name','Name is required'),
    check('name').custom(existProduct),
    check('category','It is not valid id').isMongoId(),
    validateFields
];

const validatorUpdateProduct = [
    [
        validarJWT,
        check('id','It is not valid id').isMongoId(),
        check('id').custom(existproductById),
        check('name').custom(existProduct),
        validateFields
    ]
]

const validatorDeleteProduct=[
    validarJWT,
    check('id','It is not valid id').isMongoId(),
    check('id').custom(existproductById)
]
const validatorProductById=[
    check('id','It is not valid id').isMongoId()
];
module.exports={
    validatorCreateProduct,
    validatorUpdateProduct,
    validatorDeleteProduct,
    validatorProductById
}