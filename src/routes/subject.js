const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()

router.post(
	'/',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			// const formatUsers = await User.find().select('-password -orders')
			console.log(req)
			return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/new_subject',
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

router.post(
	'/edit_subject',
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

module.exports = router
