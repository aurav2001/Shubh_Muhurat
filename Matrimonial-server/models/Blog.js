const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    excerpt: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(255)
    },
    image: {
        type: DataTypes.TEXT('long')
    },
    category: {
        type: DataTypes.STRING(255)
    },
    created: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'blogs',
    timestamps: true
});

module.exports = Blog;
