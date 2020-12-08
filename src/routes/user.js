const express = require('express')
const { authMiddleWare } = require('../middlewares')
const { hashPassword, comparePassword, generateToken } = require('../utils')
const router = express.Router()
const { query, connection } = require('../helper')

router.post('/new_student', async (req, res, next) => {
	try {
		connection.query('SELECT * FROM PERSON', (err, rows) => {})
		return res.status(200).json({})
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

router.post(
	'/current_user',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			// const formatUsers = await User.find().select('-password -orders')
			// console.log(req)
			return res.status(200).json({
				current_user: req.current_user
			})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body
		const rows = await query(
			`SELECT * FROM ACCOUNTS WHERE USERNAME = '${username}';`
		)

		const { PASS, SSN } = rows[0]

		const matchPassword = await comparePassword(password, PASS)

		if (matchPassword) {
			const token = await generateToken(SSN)
			res.status(200).json({
				token: token
			})
		} else {
			res.status(401).json({
				message: 'username or password is incorrect'
			})
		}
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

router.post('/new_user', authMiddleWare.decodeUser, async (req, res, next) => {
	try {
		// const formatUsers = await User.find().select('-password -orders')
		return res.status(200).json(req)
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

router.post('/edit_user', authMiddleWare.decodeUser, async (req, res, next) => {
	try {
		// const formatUsers = await User.find().select('-password -orders')
		return res.status(200).json(req)
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

module.exports = router
