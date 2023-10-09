const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/user.controller');
const { check } = require('express-validator');

const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const { validateFields, validarJWT, hasRole } = require('../middlewares');
const { validatorUpdateUser, validatorCreateUser, validatorDeleteUser } = require('../validators');

const router = Router();
router.get('/',validarJWT,usersGet );

router.put('/:id',validatorUpdateUser, usersPut);

router.post('/',validatorCreateUser,usersPost );

router.delete('/:id', validatorDeleteUser,usersDelete);


module.exports = router;