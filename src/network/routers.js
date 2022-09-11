const message = require('../componets/message/network');
const user = require('../componets/user/network');
const routes = function(server) {
    server.use('/message', message);
    server.use('/user', user);
}

module.exports = routes;