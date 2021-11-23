const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    plot: {
        type: String,
    },
    fullplot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    genres: {
        type: Array
    },
    imdb: {
        type: Object
    },
    runtime: {
        type: Number
    },
    cast: {
        type: Array
    },
    tomatoes: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('movies', movieSchema)