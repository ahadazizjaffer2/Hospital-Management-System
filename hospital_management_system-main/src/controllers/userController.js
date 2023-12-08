const PatientProfile = require('../models/PatientProfile');
const { User, DoctorProfile, DoctorSchedule, DoctorAddress, Appointment } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');
const { mainDbInstance: sequelize } = require('../config');


const getAllDoctors = async (req, res) => {

    try {
        const users = await DoctorProfile.findAll({
            include: [{
                model: User
            }, {
                model: DoctorSchedule
            }, {
                model: DoctorAddress
            }]
        });
        const data = users.map(user => ({
            // userId: user.dataValues.userId,
            doctorId: user.dataValues.id,
            fullName: user.dataValues.User.firstName + " " + user.dataValues.User.lastName,
            description: user.dataValues.description,
            email: user.dataValues.User.email,
            image: user.dataValues.image,
            specialization: user.dataValues.specialization,
            experience: user.dataValues.experience,
            fee: user.dataValues.fee,
            onCall: user.dataValues.onCall,
            doctorSchedule: user.dataValues.DoctorSchedules,
            doctorAddress: user.dataValues.DoctorAddresses
    
        }))
        return res.json({ message: "All doctors", data });
    } catch (error) {
        console.log(error);
    }
    
}

const getSpecificDoctors = async (req, res) => {
    const { specialization, day } = req.body;

    if (!specialization || !day) {
        return res.status(400).json({ message: "Specialization and day are required", data: null });
    }

    const users = await DoctorProfile.findAll({
        where: {
            specialization: specialization
        },
        include: [{
            model: User
        }, {
            model: DoctorSchedule,
            where: {
                day: day
            }
        }]
    });

    const data = users.map(user => ({
        userId: user.dataValues.userId,
        doctorId: user.dataValues.id,
        fullName: user.dataValues.User.firstName + " " + user.dataValues.User.lastName,
        description: user.dataValues.description,
        email: user.dataValues.User.email,
        image: user.dataValues.image,
        specialization: user.dataValues.specialization,
        experience: user.dataValues.experience,
        fee: user.dataValues.fee,
        onCall: user.dataValues.onCall,
        day: day

    }))
    return res.json({ message: "All doctors", data });
}

const createPatient = async (req, res) => {
    const { firstName, lastName, email, password, bloodGroup, age, gender } = req.body;

    if (!firstName || !lastName || !email || !password || !bloodGroup || !age || !gender) {
        return res.status(400).json({ message: "All fields are required", data: null });
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        return res.status(400).json({ message: "User already exists", data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    const patient = await PatientProfile.create({
        userId: user.id,
        bloodGroup,
        age,
        gender,
        image: req.body.image ? req.body.image : null
    });
    const accessToken = jwt.sign(
        {
            user,
            patient,
            userType: "patient"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15h"
        }
    )

    return res.json({
        message: "Patient created successfully",
        data: { user, patient, accessToken }
    });
}

const createDoctor = async (req, res) => {
    const { firstName, lastName, email, password, specialization, experience, fee, description } = req.body;

    if (!specialization || !experience || !fee || !description || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Specialization, experience, fee, first name, last name, email and description are required", data: null });
    }

    const userExists = await User.findOne({
        where: {
            email
        }
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists", data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    const doctor = await DoctorProfile.create({
        userId: user.id,
        specialization,
        experience,
        fee,
        description,
        image: req.body.image ? req.body.image : null
    });
    const accessToken = jwt.sign(
        {
            user,
            doctor,
            userType: "doctor"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15h"
        }
    )

    return res.json({
        message: "Doctor created successfully",
        data: { user, doctor, accessToken }
    });
}

const createDoctorSchedule = async (req, res) => {
    const { doctorId, day } = req.body;

    const doctorRecord = await DoctorProfile.findOne({
        where: {
            id: doctorId
        }
    });

    if (!doctorRecord) {
        return res.status(400).json({ message: "Doctor not found", data: null });
    }

    const doctorSchedule = await DoctorSchedule.create({
        userId: doctorId,
        day
    })

    return res.json({
        message: "Doctor schedule created successfully",
        data: doctorSchedule
    })
}

const createDoctorAddress = async (req, res) => {
    const { doctorId, hospitalName, area, city, state, lat, lng } = req.body;

    const doctorRecord = await DoctorProfile.findOne({
        where: {
            id: doctorId
        }
    });

    if (!doctorRecord) {
        return res.status(400).json({ message: "Doctor not found", data: null });
    }

    const doctorAddressRecord = await DoctorAddress.findOne({
        where: {
            userId: doctorId
        }
    })

    if (doctorAddressRecord) {
        return res.status(400).json({ message: "Doctor address already exists", data: null });
    }

    const doctorAddress = await DoctorAddress.create({
        userId: doctorId,
        hospitalName,
        area,
        city,
        state,
        lat,
        lng
    })

    return res.json({
        message: "Doctor address created successfully",
        data: doctorAddress
    })
}

const removeDoctor = async (req, res) => {
    const { doctorId } = req.body;

    const doctorRecord = await User.findOne({
        include: [{
            model: DoctorProfile,
            where: {
                id: doctorId
            },
            include: [{
                model: DoctorSchedule
            },
            {
                model: DoctorAddress
            }]
        }]
    });

    if (!doctorRecord) {
        return res.status(400).json({ message: "Doctor not found", data: null });
    }

    const t = await sequelize.transaction();

    try {

        await Appointment.destroy({ where: { doctorId: doctorId }, force: true }, { transaction: t });
        await DoctorAddress.destroy({ where: { userId: doctorId }, force: true }, { transaction: t });
        await DoctorSchedule.destroy({ where: { userId: doctorId }, force: true }, { transaction: t });
        await DoctorProfile.destroy({ where: { id: doctorId }, force: true }, { transaction: t });
        await User.destroy({ where: { id: doctorRecord.id }, force: true }, { transaction: t });

        await t.commit();
    } catch (error) {
        console.log(error);
        await t.rollback();
        return res.status(500).json({ message: "Internal server error", data: null });
    }

    return res.json({
        message: "Doctor removed successfully",
        // data: doctorRecord
    })
}


const getNearbyDoctors = async (req, res) => {

    const { lat, lng, specialization } = req.body;

    const doctors = await DoctorProfile.findAll({
        where: {
            specialization: specialization
        },
        include: [{
            model: User
        }, {
            model: DoctorSchedule
        }, {
            model: DoctorAddress,
            where: {
                lat: {
                    [Op.between]: [lat - 1, lat + 1]
                },
                lng: {
                    [Op.between]: [lng - 1, lng + 1]
                }
            }
        }]
    });

    return res.json({
        message: "Nearby doctors fetched successfully",
        data: doctors
    });
}

module.exports = {
    createPatient,
    createDoctor,
    getAllDoctors,
    createDoctorSchedule,
    createDoctorAddress,
    getSpecificDoctors,
    removeDoctor,
    getNearbyDoctors
}