const express =  require('express')
const router = express.Router()
const Checkout =  require('../models/checkoutmodel')
const Checkin =  require('../models/checkinmodel')

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
            name: req.body.name,
            user: req.body.user
        })
        try {
            const newcheckout = await checkoutdata.save()
            res.status(201).json(newcheckout)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })

    // ==> update log
    router.patch('/:id', async (req, res) => {
        const filter = {
            _id: req.body.checkoutid
        }
        const checkoutfilter = {
            _id: req.body.checkinid
        }
        const minute = 1000 * 60;
        
        try {
            const findcheckout = await Checkout.findOne(filter)
            const findcheckin = await Checkin.findOne(checkoutfilter)
            if (findcheckin != null && findcheckout != null) {

                if (findcheckin.accessTime > findcheckout.accessTime) {
                    if ((Math.round(findcheckin.accessTime.getTime() / minute) - Math.round(findcheckout.accessTime.getTime() / minute)) > 30) {
                        
                        const updatedata = {
                            name: findcheckout.name,
                            accessType:findcheckout.accessType,
                            user: findcheckout.user,
                            accessTime: Date.now()
                        }
                        const update = await Checkout.findOneAndUpdate(filter, updatedata,)
                        res.status(200).json(update)
                    }else{
                        res.status(200).json({message: 'You not able to go outside'})
                    }
                }
                else{
                    res.status(200).json({message: 'he already outside'})
                }
            }else{
                res.status(404).json({message: 'Checkout data not found'})
            }
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })


module.exports = router