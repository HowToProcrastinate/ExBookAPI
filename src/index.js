const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', function (request, response) {
    response.send(`Hello on port ${PORT}`);
});

app.listen(PORT, function() {
    console.log(`Express server started on ${PORT}`);
});