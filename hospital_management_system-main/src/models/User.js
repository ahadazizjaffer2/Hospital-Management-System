const { Model, DataTypes } = require('sequelize');

const { mainDbInstance: sequelize } = require('../config');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, { sequelize, timestamps: true, underscored: true, paranoid: true });

module.exports = User;