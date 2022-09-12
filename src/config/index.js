require('dotenv').config({
	path: './.env'
});

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.HOST,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	port: process.env.PORT || 3000,
	uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};

module.exports = config;
