const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const { connection } = require('../helper')

router.post('/', async (req, res, next) => {
	try {
		connection.query('SELECT * FROM PERSON', (err, rows) => {
			console.log(rows)
		})
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
			console.log(req)
			return res.status(200).json(req)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post('/login', async (req, res, next) => {
	try {
		console.log(req.params)
		return res.status(200).json(req)
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

router.post('/new_user', authMiddleWare.decodeUser, async (req, res, next) => {
	try {
		// const formatUsers = await User.find().select('-password -orders')
		console.log(req.params)
		return res.status(200).json(req)
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

router.post('/edit_user', authMiddleWare.decodeUser, async (req, res, next) => {
	try {
		// const formatUsers = await User.find().select('-password -orders')
		console.log(req)
		return res.status(200).json(req)
	} catch (err) {
		return res.status(500).json({ message: err })
	}
})

module.exports = router
