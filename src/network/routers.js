const message = require('../componets/message/network');
const user = require('../componets/user/network');
const chat = require('../componets/chat/network');

const routes = function(server) {
    server.use('/api/message', message);
    server.use('/api/user', user);
    server.use('/api/chat', chat);
}

module.exports = routes;