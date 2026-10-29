const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Story = sequelize.define('Story', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    names: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    date: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    story: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT('long')
    }
}, {
    tableName: 'stories',
    timestamps: true
});

module.exports = Story;
