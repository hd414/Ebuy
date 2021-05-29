const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentController')
const { isAdmin, auth } = require('../middleware/auth')




router.route('/payment')
    .get(auth, isAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router
