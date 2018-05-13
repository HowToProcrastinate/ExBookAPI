require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

let DB_URI = process.env.MONGODB_URI;
let DB_NAME = process.env.MONGODB_DB_NAME;

if(process.env.NODE_ENV === 'test') {
    DB_URI = process.env.MONGODB_URI_TEST;
    DB_NAME = process.env.MONGODB_DB_NAME_TEST;
}

var db = null;

MongoClient.connect(DB_URI, (err, client) => {
    if(err) {
        throw err;
    }
    db = client.db(DB_NAME);
});

function add(res, collection, data) {
    db.collection(collection).insert(
        data, 
        function(err, r) {
            if (err) {
                throw err;
            }else{
                res.status(201).send(r.ops[0]);
            }
        });
}

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
            if(r === null) {
                res.sendStatus(404);
            }else{
                res.status(200).send(r);
            }
        }
    });
}

function edit(res, collection, data) {
    try {
        data._id =  new ObjectId(data.id);
        delete data.id;
    } catch (error) {
        res.sendStatus(404);
        return;
    }
    db.collection(collection).updateOne(
        { _id: data._id }, 
        { $set: Object.assign({}, data) }, 
        function (err, r) {
            if (err) {
                throw err;
            }else{
                if(r.matchedCount === 0) {
                    res.sendStatus(404);
                }else{
                    res.send(r);
                }
            }
        });
}

function remove(res, collection, id) {
    let _id = {};
    try {
        _id = { 
            '_id': new ObjectId(id) 
        };
    } catch (error) {
        res.sendStatus(404);
        return;
    }
    db.collection(collection).remove(_id);
    res.status(200).send('ok');
}

module.exports = {
    add,
    getAll,
    get,
    edit,
    remove
};