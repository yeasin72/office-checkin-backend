const mongoose = require('mongoose')

const accesslogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        required: true,
    },
    accessTime: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Accesslog', accesslogSchema)