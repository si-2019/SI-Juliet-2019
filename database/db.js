const Sequelize = require('sequelize');
const path = require('path')

/*const sequelize = new Sequelize(
    "TYQcLL35gV",   // database
    "TYQcLL35gV",   // username
    "BLysSj9ZrP",   // password
    {
        host:"37.59.55.185",
        dialect:"mysql"
    }

    );
*/

const sequelize = new Sequelize("TYQcLL35gV", "TYQcLL35gV", "BLysSj9ZrP", {
  host: "mysql-3213-0.cloudclusters.net",
  dialect: "mysql",
  port: 10021,
  logging: false
});

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.files = sequelize.import(path.join(__dirname, 'Files.js'));
db.pinovanePoruke = sequelize.import(path.join(__dirname, 'Pinovane.js'));
db.chatColorScheme = sequelize.import(path.join(__dirname, 'ColorScheme.js'));
db.threads = sequelize.import(path.join(__dirname, 'Threads.js'));
db.threadMessage = sequelize.import(path.join(__dirname, 'ThreadMessage.js'));
db.events=sequelize.import(path.join(__dirname, 'Events.js'));
db.blockedUsers = sequelize.import(path.join(__dirname,'BlockedUsers.js'));
db.threads.hasMany(db.threadMessage, { 
    foreignKey: 'threadId', 
    as: 'messages' 
});

module.exports = db;