const {Router }= require('express');
const { getAllCategories, getCategoryById, saveCategory, updatedCategory, deleteCategoryById } = require('../controllers/category.controller');
const {validatorCategoryById,validatorCreateCategory,validatorUpdateCategory,validatorDeleteCategory}= require('../validators')
const router= Router();

router.get('/',getAllCategories);

router.get('/:id',validatorCategoryById,getCategoryById);
router.post('/',validatorCreateCategory,saveCategory);
router.put('/:id',validatorUpdateCategory,updatedCategory);
router.delete('/:id',validatorDeleteCategory,deleteCategoryById);

module.exports = router;