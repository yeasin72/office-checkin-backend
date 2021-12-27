const express =  require('express')
const router = express.Router()
const Accesslog =  require('../models/logmodel')

// ==> getting all log
    router.get('/', async (req, res) => {
        try {
            const log = await Accesslog.find()
            res.status(200).json(log)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    })
// ==> create log
    router.post('/', async (req, res) => {
        const accessdata = new Accesslog({
            name: req.body.name, 
            accessType: req.body.accessType,
            user: req.body.user
        })
        try {
            const newaccess = await accessdata.save()
            res.status(201).json(newaccess)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })


module.exports = router