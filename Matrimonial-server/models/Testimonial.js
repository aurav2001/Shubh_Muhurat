const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(255)
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT('long')
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    location: {
        type: DataTypes.STRING(255)
    },
    date: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'testimonials',
    timestamps: true
});

module.exports = Testimonial;
