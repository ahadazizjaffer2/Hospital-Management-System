const { Model, DataTypes, Deferrable } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class DoctorSchedule extends Model { }

DoctorSchedule.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'doctor_profiles',
                key: 'id',
            },
            deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        day: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },

    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = DoctorSchedule;