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
            res.status(201).send(r);
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
                res.send('No pudo ser actualizado el elemento');
            }else{
                res.send(r);
            }
        });
}

function remove(res, collection, conditions) {
    db.collection(collection).remove(conditions);
    res.status(200).send('ok');
}

module.exports = {
    getAll,
    get,
    add,
    edit,
    remove
};