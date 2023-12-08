const { Appointment, DoctorSchedule, PatientProfile, DoctorProfile, Payment } = require('../models');
const { mainDbInstance: sequelize } = require('../config');

const createAppointment = async (req, res) => {
    const { doctorId, patientId, day, time } = req.body;

    const doctorRecord = await DoctorProfile.findOne({
        where: {
            id: doctorId
        },
        include: {
            model: DoctorSchedule,
            where: {
                day
            }
        }
    });

    if (!doctorRecord) {
        return res.status(400).json({ message: "Doctor not available on this Day", data: null });
    }

    if (!doctorRecord.DoctorSchedules) {
        return res.status(400).json({ message: "Doctor not available on this Day", data: null });
    }

    const patientRecord = await PatientProfile.findOne({
        where: {
            id: patientId
        }
    });

    if (!patientRecord) {
        return res.status(400).json({ message: "Patient not found", data: null });
    }

    const existingAppointmentRecord = await Appointment.findOne({
        where: {
            doctorId,
            patientId,
            day,
            time
        }
    });

    if (existingAppointmentRecord) {
        return res.status(400).json({ message: "Appointment already exists for this time. Please choose another time.", data: null });
    }

    const t = await sequelize.transaction();

    try {
        const appointmentRecord = await Appointment.create({
            doctorId,
            patientId,
            day,
            time
        }, {
            transaction: t
        });

        // await Payment.create({
        //     appointmentId: appointmentRecord.id,
        //     amount: doctorRecord.fee
        // }, {
        //     transaction: t
        // })

        await t.commit();

        return res.json({
            message: "Appointment created successfully",
            data: appointmentRecord
        })

    } catch (error) {
        await t.rollback();
        console.log(error);
        return res.status(400).json({ message: "Unable to create appointment", data: null });
    }


}

const getAllAppointments = async (req, res) => {
    const { userId, userType } = req.body;
    let appointments;

    if (userType === 'doctor') {
        appointments = await Appointment.findAll(
            {
                where: {
                    doctorId: userId
                },
                include: {
                    model: PatientProfile
                }
            }
        );

        if (!appointments) {
            return res.status(400).json({ message: "No appointments found", data: null });
        }

        return res.json({
            message: "Appointments fetched successfully",
            data: appointments
        })
    } else if (userType === 'patient') {
        appointments = await Appointment.findAll(
            {
                where: {
                    patientId: userId
                },
                include: {
                    model: DoctorProfile
                }
            }
        );

        if (!appointments) {
            return res.status(400).json({ message: "No appointments found", data: null });
        }

        return res.json({
            message: "Appointments fetched successfully",
            data: appointments
        })
    } else {
        return res.status(400).json({ message: "Invalid type", data: null });
    }
}

const updateAppointment = async (req, res) => {
    const { appointmentId, remarks, prescription } = req.body;

    const appointmentRecord = await Appointment.findOne({
        where: {
            id: appointmentId
        }
    });

    if (!appointmentRecord) {
        return res.status(400).json({ message: "Appointment not found", data: null });
    }

    const updatedAppointmentRecord = await appointmentRecord.update({
        remarks,
        prescription,
        status: "completed"
    })

    return res.json({
        message: "Appointment updated successfully",
        data: updatedAppointmentRecord
    })
}
module.exports = {
    createAppointment,
    getAllAppointments,
    updateAppointment
}