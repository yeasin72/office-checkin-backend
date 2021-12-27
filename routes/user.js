const express =  require('express')
const router = express.Router()
const Users =  require('../models/usermodel')

// ==> getting all log
    router.get('/', async (req, res) => {
        try {
            const log = await Users.find()
            res.status(200).json(log)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    })
// ==> create user
    router.post('/', async (req, res) => {
        const userdata = new Users({
            value: req.body.value,
            label: req.body.label
        })
        try {
            const newuser = await userdata.save()
            res.status(201).json(newuser)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })
    // ==> update user
    router.patch('/:id', async (req, res) => {
        
        const filter = { _id: req.params.id}
        const updateddata = {
            value: req.body.value,
            label: req.body.label,
            checkinid: req.body.checkinid,
            checkoutid: req.body.checkoutid
        }
        
        try {
            const updateuser = await Users.findOneAndUpdate(filter, updateddata, {
                returnOriginal: false
            })
            res.status(200).json(updateuser)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    })

    async function checkIsThereUser(req, res, next) {
        let usercheck
        try {
            usercheck = await Users.findById(req.params.id)
            if(usercheck === null){
                return res.status(404).json({message: 'cannot find user'})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
        res.usercheck = usercheck
        next()
    }


module.exports = router