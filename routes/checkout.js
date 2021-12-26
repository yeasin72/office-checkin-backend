const express =  require('express')
const router = express.Router()
const Checkout =  require('../models/checkoutmodel')

// ==> getting all log
    router.get('/', async (req, res) => {
        try {
            const log = await Checkout.find()
            res.status(200).json(log)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    })
// ==> create log
    router.post('/', async (req, res) => {
        console.log("working");
        const checkoutdata = new Checkout({
            name: req.body.name 
        })
        try {
            const newcheckout = await checkoutdata.save()
            res.status(201).json(newcheckout)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })


module.exports = router