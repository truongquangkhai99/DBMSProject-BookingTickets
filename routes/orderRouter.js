const router = require('express').Router()
const orderCtrl = require('../controllers/orderCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/orders/createOrder/:showID')
    .put(auth, orderCtrl.createOrder)

router.route('/orders')
    .get(auth, authAdmin, orderCtrl.getAll)

module.exports = router