const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes');
const setAuth = require('./auth');
const cors = require('cors');

setAuth();
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

mongoConnect();

function mongoConnect () {
    let MONGO_URI = process.env.MONGODB_URI;
    if (process.env.NODE_ENV === 'test') {
        MONGO_URI = process.env.MONGODB_URI_TEST;
    }
    mongoose.connect(MONGO_URI);
    var db = mongoose.connection;
    db.on('error', 
        console.error.bind(console, 'MongoDB connection error:')
    );
    db.on('connected', startServer);
}

function startServer() {
    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, function() {
            console.log(`Express server started on ${PORT}`);
        });
    }
}

module.exports = app;
