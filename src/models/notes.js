const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    body: String
});

module.exports = noteSchema;