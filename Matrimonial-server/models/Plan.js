const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Plan = sequelize.define('Plan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    iconName: {
        type: DataTypes.STRING(100),
        defaultValue: 'FaStar'
    },
    price: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    features: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    color: {
        type: DataTypes.STRING(255),
        defaultValue: 'from-gray-400 to-gray-500'
    },
    recommended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'plans',
    timestamps: true
});

module.exports = Plan;
