const { check } = require("express-validator");
const { existUserById, isValidRole, existEmail } = require("../helpers");
const { validarJWT, validateFields, hasRole } = require("../middlewares");

const validatorUpdateUser=[
    validarJWT,
check('id','It is not valid id').isMongoId(),
check('id').custom(existUserById),
check('role').custom(isValidRole),
validateFields
];

const validatorCreateUser = [
    validarJWT,
    check('name','name is required').not().isEmpty(),
    check('password','The password most be at least 6 characters').isLength({min:6}),
    check('email','This is not an email').isEmail(),
    check('email').custom(existEmail),
    // check('role','It is not a valid rol').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
];

const validatorDeleteUser=[
    validarJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id','It is not valid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields
]
module.exports = {
    validatorUpdateUser,
    validatorCreateUser,
    validatorDeleteUser
}