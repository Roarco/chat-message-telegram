const express = require('express');
const message = require('../componets/message/network');

const routes = function(server) {
    server.use('/message', message);
}

module.exports = routes;