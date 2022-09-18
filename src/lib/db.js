const mongoose = require("mongoose");
const config = require('../config');
const chalk = require('chalk');

const uri = `mongodb+srv://roarco:1104017400@cluster0.r5gkvxf.mongodb.net/MessageDB?retryWrites=true&w=majority`;

const connect = async () => {
    try{
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(chalk.green('Database connected'));
    }catch(err){
        console.log(chalk.red('Database connection failed'));
    }
}

module.exports = {
    connect
}