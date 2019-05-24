const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define('Dogadaj', {
        naziv: Sequelize.STRING,
        kreirao: Sequelize.STRING,
        pocetak: Sequelize.DATE,
        kraj: Sequelize.DATE,
        napomena: Sequelize.STRING
    }, {freezeTableName : true})

    return events;
}
