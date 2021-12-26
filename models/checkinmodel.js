const mongoose = require('mongoose')

const checkinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        required: true,
        default: 'Checkin'
    },
    accessTime: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Checkin', checkinSchema)