const { check } = require("express-validator");
const { validateFields, validateFile } = require("../middlewares");
const { allowedCollection } = require("../helpers");

const validatorUpdateUpload=[
    validateFile,
    check('id','It is not valid id').isMongoId(),
    check('collection').custom(c=>allowedCollection(c,['users','products'])),
    validateFields
];


const validatorGetFileCollectionById=[
    check('id','It is not valid id').isMongoId(),
    check('collection').custom(c=>allowedCollection(c,['users','products'])),
    validateFields
]
module.exports = {
    validatorUpdateUpload,
    validatorGetFileCollectionById
}