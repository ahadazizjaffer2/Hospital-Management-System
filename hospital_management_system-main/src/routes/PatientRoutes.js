require('dotenv').config();
const express = require('express')
const UserController = require('../controllers/userController')
const AppointmentController = require('../controllers/appointmentController')
const router = express.Router()
const jwt = require('jsonwebtoken')

// create user
router.post('/create-patient', UserController.createPatient);

// get all doctors
router.get('/all-doctors', UserController.getAllDoctors);

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

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: "Forbidden" })
//         }

//         console.log(decoded);
//         if (decoded.userType !== 'patient') {

//             return res.status(401).json({ message: "Unauthorized" })
//         }

//     })

//     next();
// })


// get specific doctors
router.post('/get-specific-doctors', UserController.getSpecificDoctors);
// get nearby doctor
router.post('/get-nearby-doctors', UserController.getNearbyDoctors);
// create appointment
router.post('/create-appointment', AppointmentController.createAppointment);
// get all appointments for patients
router.post('/get-all-appointments', AppointmentController.getAllAppointments);

module.exports = router