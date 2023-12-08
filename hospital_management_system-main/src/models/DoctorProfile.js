const { Model, DataTypes, Deferrable } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class DoctorProfile extends Model { }

DoctorProfile.init(
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
        specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        onCall: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = DoctorProfile;