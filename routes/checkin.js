const express =  require('express')
const router = express.Router()
const Checkin =  require('../models/checkinmodel')
const Checkout = require('../models/checkoutmodel')

// ==> getting all log
    router.get('/', async (req, res) => {
        try {
            const log = await Checkin.find()
            res.status(200).json(log)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    })
// ==> create log
    router.post('/', async (req, res) => {
        const checkindata = new Checkin({
            name: req.body.name,
            user: req.body.user
        })
        try {
            const newcheckin = await checkindata.save()
            res.status(201).json(newcheckin)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })

// ==> update log
    router.patch('/:id', async (req, res) => {
        const filter = {
            _id: req.body.checkinid
        }
        const checkoutfilter = {
            _id: req.body.checkoutid
        }
        
        try {
            const findcheckout = await Checkout.findOne(checkoutfilter)
            const findcheckin = await Checkin.findOne(filter)
            if (findcheckin != null && findcheckout != null) {
                if (findcheckin.accessTime < findcheckout.accessTime) {
                    const updatedata = {
                        name: findcheckin.name,
                        accessType:findcheckin.accessType,
                        user: findcheckin.user,
                        accessTime: Date.now()
                    }
                    const update = await Checkin.findOneAndUpdate(filter, updatedata,)
                    res.status(200).json(update)
                }
                else{
                    res.status(200).json({message: 'he already inside'})
                }
            }else{
                res.status(404).json({message: 'Checkin data not found'})
            }
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })

// ==> delete router
router.delete(`/:id`, async (req, res) =>  {
    try {
        await Checkin.deleteOne({ _id: req.params.id })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router