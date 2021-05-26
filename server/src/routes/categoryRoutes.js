const { getCategory, createCategory, deleteCategory, editCategory } = require('../controllers/categoryController');
const { auth, isAdmin } = require('../middleware/auth');



const router = require('express').Router();


router.get('/category/get', getCategory);
router.post('/category/create', auth, isAdmin, createCategory)
router.delete('/category/:id', auth, isAdmin, deleteCategory);
router.put('/category/:id', auth, isAdmin, editCategory);

module.exports = router;