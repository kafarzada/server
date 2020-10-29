const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    gosNumber: {
        type: String,
        required: true
    },
    arrivadData: {
        type: Date,
    },
    placeNumber: {
        type: Number,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
})

module.exports = mongoose.model('car', carSchema )