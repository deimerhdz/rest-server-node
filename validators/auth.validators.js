const { check } = require("express-validator");
const { validateFields } = require("../middlewares");

const validatorSignIn  =[
    check('email','The email is required').isEmail(),
    check('password','The passowrd is required').not().isEmpty(),
    validateFields
]

const validatorGoogleSignIn =[
    check('id_token','id_token is required').not().isEmpty(),
    validateFields
];

module.exports = {
    validatorSignIn,
    validatorGoogleSignIn
}