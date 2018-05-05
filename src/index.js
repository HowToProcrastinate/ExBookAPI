const express = require('express');
const routes = require('./routes');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', routes);

app.listen(PORT, function() {
    console.log(`Express server started on ${PORT}`);
});