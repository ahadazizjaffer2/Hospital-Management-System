const { Model, DataTypes, Deferrable } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class DoctorAddress extends Model { }

DoctorAddress.init(
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
        hospitalName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        lng: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }

    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = DoctorAddress;