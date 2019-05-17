const Sequelize = require('sequelize');
const path = require('path')

const sequelize = new Sequelize(
    "TYQcLL35gV",   // database
    "TYQcLL35gV",   // username
    "BLysSj9ZrP",   // password
    {
        host:"37.59.55.185",
        dialect:"mysql"
    }

    );

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.files = sequelize.import(path.join(__dirname, 'Files.js'));
db.pinovanePoruke = sequelize.import(path.join(__dirname, 'Pinovane.js'));

module.exports = db;