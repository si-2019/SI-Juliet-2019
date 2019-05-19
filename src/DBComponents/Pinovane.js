const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const pinovanePoruke = sequelize.define('PinovanePoruke', {
        messageCreatedAt: Sequelize.STRING, 
        messageId: {
            type: Sequelize.STRING,
            unique: true
        },
        roomId: Sequelize.STRING, 
        senderId: Sequelize.STRING, 
        text: Sequelize.STRING
    }, {freezeTableName : true})

    return pinovanePoruke;
}