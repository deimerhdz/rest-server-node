const validatorProduct = require('./products.validators')
const validatorCategory = require('./categories.validators')
const validatorUser = require('./users.validators')
const validatorUpload = require('./uploads.validators')
const validatorAuth = require('./auth.validators')
module.exports = {
    ...validatorProduct,
    ...validatorCategory,
    ...validatorUser,
    ...validatorUpload,
    ...validatorAuth
}