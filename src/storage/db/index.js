require('dotenv').config();
function getDB() {
    var db = null;
    if (process.env.NODE_ENV === 'test') {
        db = require('./fake-db');
    }else{
        switch (process.env.DB) {
        case 'mongodb':
            db = require('./mongo');
            break;
        default:
            break;
        }
    }
    return db;
}

module.exports = getDB();