const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define('Dogadjaj', {
        naziv: Sequelize.STRING,
        kreirao: Sequelize.STRING,
        pocetak: Sequelize.DATE,
        trajanje: Sequelize.STRING,
        napomena: Sequelize.STRING
    }, {freezeTableName : true})

    return events;
}
