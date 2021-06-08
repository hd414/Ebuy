const { getProducts, createProduct, editProducts, deleteProducts, getProduct } = require('../controllers/productCotroller');
const { authAdmin } = require('../middleware/authAdmin');

const router = require('express').Router();


router.get('/products', getProducts)

router.get('/products/:id', getProduct);

router.post('/products', authAdmin, createProduct)

router.put('/products/:id', authAdmin, editProducts)

router.delete('/products/:id', authAdmin, deleteProducts)

module.exports = router;