const router = require('express').Router()
const showCtrl = require('../controllers/showCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/shows/nowShowing')
    .get(showCtrl.nowShowing)

router.route('/shows/comingSoon')
    .get(showCtrl.comingSoon)

router.route('/shows/:id')
    .delete(auth, authAdmin, showCtrl.deleteShow)
    .put(auth, authAdmin, showCtrl.updateShow)

router.route('/shows/updateSeat/:id')
    .put(auth, showCtrl.updateSeat)

router.route('/show/detail/:id')
    .get(showCtrl.getByID)

router.route('/shows')
    .post(auth, authAdmin, showCtrl.createShow)

module.exports = router