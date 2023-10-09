const {Router}= require('express');
const {check}= require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validatorSignIn, validatorGoogleSignIn } = require('../validators');

const router = Router();
router.post('/login',validatorSignIn,login)
router.post('/google',validatorGoogleSignIn,googleSignIn)

module.exports =router;