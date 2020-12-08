const { sign, verify } = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../../environments')
const { query } = require('../../helper')

/**
 * Returns token.
 *
 * @remarks
 * This method is part of the {@link utils/jwt}.
 *
 * @param user - 1st input
 *
 * @returns The access token mean of `user`
 *
 */

const generateToken = async (ssn) => {
	return await sign(
		{
			ssn: ssn
		},
		PRIVATE_KEY
	)
}

/**
 * Returns user by verify token.
 *
 * @remarks
 * This method is part of the {@link utils/jwt}.
 *
 * @param token - 1st input
 *
 * @returns The user mean of `token`
 */

const verifyToken = async (token) => {
	const { ssn } = await verify(token, PRIVATE_KEY)
	const rows = await query(`SELECT * FROM PERSON WHERE SSN = '${ssn}'`)
	console.log(rows)
	return rows[0]
}

module.exports = {
	generateToken,
	verifyToken
}
