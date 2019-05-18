const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const colors = sequelize.define('ChatColorScheme', {
        userId: Sequelize.STRING,        // dodaj index
        colorId: Sequelize.STRING,
    }, {freezeTableName : true})

    return colors;
}