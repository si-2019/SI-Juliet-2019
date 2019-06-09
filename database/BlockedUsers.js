const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const blockedUsers = sequelize.define('blockedUsers', {
        blockedUserId: {
            type: Sequelize.STRING,
            unique: true
        },

    }, 
    {freezeTableName : true})

    return blockedUsers;
}