const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    label:{
        type: String,
        required: true,
    },
    checkinid:{
        type: mongoose.Types.ObjectId,
        ref: 'checkins'
    },
    checkoutid:{
        type: mongoose.Types.ObjectId,
        ref: 'checkouts'
    }
})

module.exports = mongoose.model('Users', userSchema)