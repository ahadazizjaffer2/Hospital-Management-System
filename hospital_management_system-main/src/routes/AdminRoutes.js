require('dotenv').config();
const express = require('express')
const AdminController = require('../controllers/adminController')
const UserController = require('../controllers/userController')
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

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

//         if (err) {

//             return res.status(403).json({ message: "Forbidden" })
//         }

//         if (user.userType !== 'admin' || user.isAdmin === false) {

//             return res.status(403).json({ message: "Forbidden" })
//         }
//     })

//     next()
// })

// get all payments
router.get('/get-all-payments', AdminController.getAllPayments);
// update payment status
router.post('/update-payment-status', AdminController.updatePaymentStatus);
// create doctor
router.post('/create-doctor', UserController.createDoctor);
// create doctor schedule
router.post('/create-doctor-schedule', UserController.createDoctorSchedule);
// create doctor address
router.post('/create-doctor-address', UserController.createDoctorAddress);
// remove doctor
router.delete('/remove-doctor', UserController.removeDoctor);


module.exports = router