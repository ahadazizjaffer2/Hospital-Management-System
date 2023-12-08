const express = require('express')
const AppointmentController = require('../controllers/appointmentController')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})


module.exports = router