const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    showID: {
        type: String,
        require: true
    },
    customerID: {
        type: String,
        require: true
    },
    totalMoney: {
        type: Number,
        require: true
    },
    orderTime: {
        type: String,
        require: true
    },
    seats: {
        type: Array,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)