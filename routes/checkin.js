const express =  require('express')
const router = express.Router()
const Checkin =  require('../models/checkinmodel')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
        console.log("checkin working");
        const checkindata = new Checkin({
            name: req.body.name 
        })
        try {
            const newcheckin = await checkindata.save()
            res.status(201).json(newcheckin)
            const checkinid = await newcheckin && `${newcheckin._id}`
            setTimeout(() => {
                const xhr = new XMLHttpRequest()
                xhr.open("DELETE", `http://localhost:8000/check-in/${checkinid}`)
                xhr.send()
            }, 1800000) // set time here
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