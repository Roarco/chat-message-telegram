
const mongoose = require("mongoose");
const Model = require("./model");

const username = 'roarco';
const password = '1104017400';
const dbName = 'MessageDB';
const uri = `mongodb+srv://${username}:${password}@cluster0.r5gkvxf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((err) => {
        console.log('Error al conectar a la base de datos', err);
    });


function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage() {
    const messages = await Model.find();
    return messages;
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id,
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
};