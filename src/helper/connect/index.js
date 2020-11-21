const mysql = require('mysql')
const {
	DATABASE_NAME,
	DATABASE_HOST,
	DATABASE_USERNAME,
	DATABASE_PASSWORD
} = require('../../environments')

const connection = mysql.createConnection({
	host: DATABASE_HOST,
	user: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME
})

module.exports = { connection }
