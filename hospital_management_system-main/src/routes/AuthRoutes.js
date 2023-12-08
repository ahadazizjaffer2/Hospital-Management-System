require('dotenv').config();
const express = require('express')
const AuthController = require('../controllers/authController')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// doctor login
router.post('/doctor-login', AuthController.doctorLogin);
// patient login
router.post('/patient-login', AuthController.patientLogin);
// admin login
router.post('/admin-login', AuthController.adminLogin);


module.exports = router