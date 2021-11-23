const Orders = require('../models/orderModel')


const orderCtrl = {
    createOrder: async(req, res) => {
        try {
            let {showID, customerID, totalMoney, seats} = req.body;
            const currentDate = new Date()
            currentDate.setHours(currentDate.getHours() + 7)
            const newOrder = new Orders({
                showID, customerID, totalMoney, currentDate, seats
            })
            await newOrder.save()
            res.json("Order success.")
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAll: async(req, res) => {
        try {
            const orders = await Orders.find()
            res.json(orders)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = orderCtrl

