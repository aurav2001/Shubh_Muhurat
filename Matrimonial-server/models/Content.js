const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Content = sequelize.define('Content', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    data: {
        type: DataTypes.TEXT('long'),
        get() {
            const rawValue = this.getDataValue('data');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('data', JSON.stringify(value));
        }
    }
}, {
    tableName: 'contents',
    timestamps: true
});

module.exports = Content;
