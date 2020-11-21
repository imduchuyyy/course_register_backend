require('dotenv').config()

//Application
const PORT = process.env.PORT || 5000

//Database
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'name'
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '123'
const DATABASE_NAME = process.env.DATABASE_NAME || 'name'

//Jsonwebtoken
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'duchuy'

//bycrypt
const SALT = process.env.SALT || 10

module.exports = {
	PORT,
	DATABASE_NAME,
	DATABASE_HOST,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	PRIVATE_KEY,
	SALT
}
