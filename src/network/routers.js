const message = require('../componets/message/network');
const user = require('../componets/user/network');
const chat = require('../componets/chat/network');

const routes = function(server) {
    server.use('/message', message);
    server.use('/user', user);
    server.use('/chat', chat);
}

module.exports = routes;