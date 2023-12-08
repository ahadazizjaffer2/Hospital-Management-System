const { Model, DataTypes, Deferrable } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class PatientProfile extends Model { }

PatientProfile.init(
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
                model: 'users',
                key: 'id',
            },
            deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        bloodGroup: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['male', 'female'],
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = PatientProfile;