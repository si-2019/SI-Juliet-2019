const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const files = sequelize.define('ChatDatoteke', {
        naziv: Sequelize.STRING,        // dodaj index
        posiljaoc: Sequelize.STRING,
        soba: Sequelize.STRING,
        mimetype: Sequelize.STRING,
        file: Sequelize.BLOB
    }, {freezeTableName : true})

    return files;
}