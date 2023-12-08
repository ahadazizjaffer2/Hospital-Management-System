require('dotenv').config();
const express = require('express')
const AppointmentController = require('../controllers/appointmentController')
const router = express.Router()
const jwt = require('jsonwebtoken')

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now());

//     const authToken = req.headers['authorization'];

//     if (authToken === undefined) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     const token = authToken.split(' ')[1];

//     if (token === undefined) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: "Forbidden" })
//         }
//     })

//     if (decoded.userType !== 'doctor') {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     next();
// })

// get all appointments for doctors
router.post('/get-all-appointments', AppointmentController.getAllAppointments);
// update appointment
router.post('/update-appointment', AppointmentController.updateAppointment);

module.exports = router