const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Threads', {
        messageId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, { freezeTableName: true });
}