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
    accessTime: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Checkout', checkoutSchema)