const { signIn, signUp, signOut, getshop, getshops, getShopProducts } = require('../controllers/shopController');
const { authAdmin, isAdmin } = require('../middleware/authAdmin');

const router = require('express').Router();


router.post('/admin/signin', signIn);
router.post('/admin/signup', signUp);
router.post('/admin/signout', signOut);
// router.get('/getShop', authAdmin, isAdmin, getshop);
router.get('/getShop', authAdmin, getshop);
router.get('/getShops', getshops);
router.get('/shop/:id', getShopProducts);


module.exports = router;