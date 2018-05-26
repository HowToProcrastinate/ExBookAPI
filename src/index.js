const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

mongoConnect();

function mongoConnect (){
    let MONGO_URI = process.env.MONGODB_URI;
    if (process.env.NODE_ENV === 'test'){
        MONGO_URI = process.env.MONGODB_URI_TEST;
    }
    mongoose.connect(MONGO_URI);
    var db = mongoose.connection;
    db.on('error', 
        console.error.bind(console, 'MongoDB connection error:')
    );
    db.on('connected', startServer);
}

function startServer(){
    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, function() {
            console.log(`Express server started on ${PORT}`);
        });
    }
}

module.exports = app;