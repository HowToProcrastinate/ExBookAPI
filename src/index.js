const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function() {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Express server started on ${PORT}`);
    }
});

module.exports = app;