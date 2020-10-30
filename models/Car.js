const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    gosNumber: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    marka: {
        type: String,
        required: true
    },
    arrivedData: {
        type: Date,
    },
    color: {
        type: String,
        required: false
    },
    placeNumber: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    dimensions: { // габариты
        length: { // длина
            type: Number,
            required: true
        },
        width: { // ширина
            type: Number,
            required: true
        },
        height: { // высота
            type: Number,
            required: true
        },
    }
})

module.exports = mongoose.model('car', carSchema )