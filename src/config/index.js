require('dotenv').config({
	path: './.env'
});

const config = {
	port: process.env.PORT || 3001,
	uri: process.env.DB_URL,
	host: `${process.env.HOST}`,
};

module.exports = config;
