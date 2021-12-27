const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        required: true,
        default: 'Checkout'
    },
    user: {
        type: String,
        required: true
    },
    accessTime: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Checkout', checkoutSchema)