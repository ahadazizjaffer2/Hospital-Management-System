const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { DoctorProfile, User, PatientProfile } = require('../models');

const doctorLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({ message: "Email and password are required", data: null });
    }

    const doctor = await User.findOne({
        where: { email },
        include: [DoctorProfile, PatientProfile]
    });

    if (!doctor) {

        return res.status(400).json({ message: "Doctor not found", data: null });
    }

    if (!doctor.DoctorProfile || doctor.PatientProfile) {

        return res.status(400).json({ message: "Doctor not found", data: null });
    }

    const isPasswordMatch = await bcrypt.compare(password, doctor.password);

    if (!isPasswordMatch) {

        return res.status(400).json({ message: "Invalid credentials", data: null });
    }

    const accessToken = jwt.sign(
        {
            doctor,
            userType: "doctor"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15h"
        }
    );

    return res.json({
        message: "Doctor logged in successfully",
        data: {
            doctor,
            accessToken
        }
    })
}


const patientLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({ message: "Email and password are required", data: null });
    }

    const patient = await User.findOne({
        where: { email },
        include: [DoctorProfile, PatientProfile]
    });

    if (!patient) {

        return res.status(400).json({ message: "Patient not found", data: null });
    }

    if (patient.DoctorProfile || !patient.PatientProfile) {

        return res.status(400).json({ message: "Patient not found", data: null });
    }

    const isPasswordMatch = await bcrypt.compare(password, patient.password);

    if (!isPasswordMatch) {

        return res.status(400).json({ message: "Invalid credentials", data: null });
    }

    const accessToken = jwt.sign(
        {
            patient,
            userType: "patient"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15h"
        }
    );

    return res.json({
        message: "Patient logged in successfully",
        data: {
            patient,
            accessToken
        }
    })
}


const adminLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({ message: "Email and password are required", data: null });
    }

    const admin = await User.findOne({

        where: { email },
    });

    if (!admin) {

        return res.status(400).json({ message: "Admin not found", data: null });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {

        return res.status(400).json({ message: "Invalid credentials", data: null });
    }

    const accessToken = jwt.sign(
        {
            admin,
            userType: "admin"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15h"
        }
    )

    return res.json({
        message: "Admin logged in successfully",
        data: {
            admin,
            accessToken
        }
    })
}
module.exports = {
    doctorLogin,
    patientLogin,
    adminLogin
}