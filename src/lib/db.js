const mongoose = require("mongoose");
const config = require('../config');
const chalk = require('chalk');

const connect = async () => {
    try{
        console.log(config.uri);
        await mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(chalk.green('Database connected'));
    }catch(err){
        console.log(chalk.red('Database connection failed'));
        console.log(err);
    }
}

module.exports = {
    connect
}