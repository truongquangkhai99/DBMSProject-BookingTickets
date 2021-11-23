const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    movieID: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    seatsAvailable: {
        type: Array, //Danh sach ghe, gom co 5 mang con, tuong ung voi hang ghe A B C D E
        // Moi mang con gom 16 phan tu tuong ung voi 16 ghe. Ghe chua duoc dat cho la 0, da duoc dat la 1.
        default: [ "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13",
        "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13",
        "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13",
        "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13"
    ]
    },
    status: {
        type: String, //0 la da chieu, 1 la dang chieu, 2 la sap chieu
        // So sanh dua tren new Date(startTime.toString()) voi currentDate = new Date().
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('shows', showSchema)