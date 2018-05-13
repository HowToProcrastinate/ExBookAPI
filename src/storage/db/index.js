require('dotenv').config();
function getDB() {
    var db = null;
    switch (process.env.DB) {
    case 'mongodb':
        db = require('./mongo');
        break;
    default:
        break;
    }
    return db;
}

module.exports = getDB();