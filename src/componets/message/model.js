const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    file: {
        type: String,
    }
});

const model = mongoose.model('Message', mySchema);

module.exports = model;