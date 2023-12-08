const { Model, DataTypes, Deferrable } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class Payment extends Model { }

Payment.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        appointmentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'appointments',
                key: 'id',
            },
            deferrable: Deferrable.INITIALLY_DEFERRED,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'unpaid',
            values: ['paid', 'unpaid'],
        }
    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = Payment;