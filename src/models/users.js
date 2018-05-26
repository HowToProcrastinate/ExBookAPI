const mongoose = require('mongoose');
const noteSchema = require('./notes');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    notes: [noteSchema]
});
/**
 * The first argument is the singular name of the collection 
 * your model is for. Mongoose automatically looks for the plural 
 * version of your model name. 
 */
module.exports = mongoose.model('user', userSchema);