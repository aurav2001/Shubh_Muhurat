const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING(50),
        defaultValue: 'user'
    },
    plan: {
        type: DataTypes.STRING(100),
        defaultValue: 'Free'
    },
    loading: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    phone: {
        type: DataTypes.STRING(50)
    },
    gender: {
        type: DataTypes.STRING(50)
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'active'
    },
    joined: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;
