const { getProducts, createProduct, editProducts, deleteProducts } = require('../controllers/productCotroller');

const router = require('express').Router();


router.get('/products', getProducts)

router.post('/products', createProduct)

router.put('/products/:id', editProducts)

router.delete('/products/:id', deleteProducts)

module.exports = router;