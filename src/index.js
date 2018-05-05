const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function() {
    console.log(`Express server started on ${PORT}`);
});