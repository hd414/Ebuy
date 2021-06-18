const { getUserOrders, getAdminOrders, orderFromShop, changeStatus } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');
const { authAdmin } = require('../middleware/authAdmin');

const router = require('express').Router();


router.get('/orders/user', auth, getUserOrders);
router.get('/orders/admin', authAdmin, getAdminOrders);

router.post('/orders', auth, orderFromShop);
router.put('/orders/:id', authAdmin, changeStatus);


module.exports = router;