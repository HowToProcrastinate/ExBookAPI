require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

var db = null;

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if(err) {
        throw err;
    }
    db = client.db(process.env.MONGODB_DB_NAME);
});

function getAll(res, collection) {
    db.collection(collection).find().toArray(function(err, r) {
        if (err) {
            throw err;
        }else{
            res.send(r);
        }
    });
}

function get(res, collection, id) {
    let finder = {};
    try {
        finder = { 
            '_id': new ObjectId(id) 
        };
    } catch (error) {
        res.sendStatus(404);
        return;
    }
    db.collection(collection).findOne(finder, function(err, r) {
        if (err) {
            res.sendStatus(404);
        }else{
            res.send(r);
        }
    });
}

function add(res, collection, data) {
    db.collection(collection).save(data, function(err, r) {
        if (err) {
            throw err;
        }else{
            res.send(r);
        }
    });
}

module.exports = {
    getAll,
    get,
    add
};