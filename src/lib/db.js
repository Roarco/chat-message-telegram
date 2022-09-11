const mongoose = require("mongoose");

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const uri = `mongodb+srv://${username}:${password}@cluster0.r5gkvxf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connect = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((err) => {
        console.log('Error al conectar a la base de datos', err);
    });
}

module.exports = {
    connect
}