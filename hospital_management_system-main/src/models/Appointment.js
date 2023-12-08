const { Model, DataTypes, Deferrable } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class Appointment extends Model { }

Appointment.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        patientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'patient_profiles',
                key: 'id',
            },
            deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        doctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'doctor_profiles',
                key: 'id',
            },
            deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        day: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'pending',
            values: ['pending', 'completed', 'rejected'],
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        prescription: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        }
    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = Appointment;