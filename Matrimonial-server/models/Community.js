const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Community = sequelize.define('Community', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING(500)
    },
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    sliderImages: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    featuredProfiles: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    members: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: {
        type: DataTypes.TEXT('long')
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'Active'
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: 'India'
    },
    created: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'communities',
    timestamps: true
});

module.exports = Community;
