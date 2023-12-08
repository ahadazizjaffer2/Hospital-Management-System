const User = require('./User');
const DoctorProfile = require('./DoctorProfile');
const DoctorSchedule = require('./DoctorSchedule');
const DoctorAddress = require('./DoctorAddress');
const PatientProfile = require('./PatientProfile');
const Appointment = require('./Appointment');
const Payment = require('./Payment');


User.hasOne(DoctorProfile, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'doctor'
});

User.hasOne(PatientProfile, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'patient'
});

DoctorProfile.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'user'
});

DoctorProfile.hasMany(DoctorSchedule, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'doctor'
});

DoctorProfile.hasMany(DoctorAddress, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'doctor'
});

DoctorSchedule.belongsTo(DoctorProfile, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'doctor'
});

DoctorAddress.belongsTo(DoctorProfile, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'doctor'
});

PatientProfile.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    // as: 'user'
});

Appointment.belongsTo(DoctorProfile, {
    foreignKey: 'doctorId',
    onDelete: 'CASCADE',
    // as: 'doctor'
});

Appointment.belongsTo(PatientProfile, {
    foreignKey: 'patientId',
    onDelete: 'CASCADE',
    // as: 'patient'
});

Payment.belongsTo(Appointment, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
    // as: 'user'
})

module.exports = {
    User,
    DoctorProfile,
    DoctorSchedule,
    DoctorAddress,
    PatientProfile,
    Appointment,
    Payment
}