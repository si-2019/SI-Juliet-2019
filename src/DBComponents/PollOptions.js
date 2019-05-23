const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PollOptions', {
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        votes: Sequelize.INTEGER
    }, { freezeTableName: true });
}