const { check } = require("express-validator")
const { validarJWT, validateFields } = require("../middlewares");
const { existCategoryById } = require("../helpers");

const validatorCreateCategory = [
    validarJWT,
    check('name','Name is required').not().isEmpty(),
    validateFields,
]

const validatorCategoryById=[
    check('id','It is not valid id').isMongoId(),
    check('id').custom(existCategoryById)
    ];
const validatorUpdateCategory = [
    validarJWT,
    check('id','It is not valid id').isMongoId(),
    check('id').custom(existCategoryById)
    ];

const validatorDeleteCategory =[
    validarJWT,
    check('id').custom(existCategoryById)
    ]
module.exports = {
    validatorCreateCategory,
    validatorCategoryById,
    validatorUpdateCategory,
    validatorDeleteCategory
}