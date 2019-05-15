const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const files = sequelize.define('ChatDatoteke', {
        naziv: Sequelize.STRING,        // dodaj index
        posiljaoc: Sequelize.STRING,
        soba: Sequelize.STRING,
        mimetype: Sequelize.STRING,
        file: DataTypes.BLOB('long')
    }, {freezeTableName : true})

    return files;
}