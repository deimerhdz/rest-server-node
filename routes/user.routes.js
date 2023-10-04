const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/user.controller');

const router = Router();
router.get('/',usersGet );
router.put('/:id', usersPut);
router.post('/',usersPost );
router.delete('/:id', usersDelete);


module.exports = router;