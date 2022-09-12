const mongoose = require("mongoose");
const config = require('../config');
//const chalk = require('chalk');


const connect = async () => {
    try{
        await mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado a la base de datos');
    }catch(err){
        console.log('Error al conectar a la base de datos', err);
    }
}

module.exports = {
    connect
}