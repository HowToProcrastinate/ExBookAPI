require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if(err) {
        throw err;
    }
    // const db = client.db(process.env.MONGODB_DB_NAME);
});

function getAll(schema) {
    let notes = [];
    notes.push({
        'title': 'Note 1',
        'body': 'Content'
    });
    notes.push({
        'title': 'Note 2',
        'body': 'Content'
    });
    notes.push({
        'title': 'Note 3',
        'body': 'Content'
    });
    notes.push({
        'title': 'Note 4',
        'body': 'Content'
    });
    notes.push({
        'title': 'Note 5',
        'body': 'Content'
    });
    return notes;
}

function get(schema, id) {
    return (id >= getAll().length) ? -1 : getAll()[id];
}

module.exports = {
    getAll,
    get
}