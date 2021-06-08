const { getCategory, createCategory, deleteCategory, editCategory } = require('../controllers/categoryController');
const { authAdmin, isAdmin } = require('../middleware/authAdmin');




const router = require('express').Router();


router.get('/category/get', getCategory);
router.post('/category/create', authAdmin, isAdmin, createCategory)
router.delete('/category/:id', authAdmin, isAdmin, deleteCategory);
router.put('/category/:id', authAdmin, isAdmin, editCategory);

module.exports = router;