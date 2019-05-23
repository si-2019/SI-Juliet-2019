const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Polls', {
        roomId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        question: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });
}