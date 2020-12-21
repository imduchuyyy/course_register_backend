const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()

router.post(
	'/insert_instructor_teach',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			console.log("insert instructor teach")
			return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
    '/instructor_in_semeter',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
	try {
	    console.log("instructor in semeter")
	    return res.status(200).json({})
	} catch (err) {
	    return res.status(500).json({ message: err })
	}
    }
)

module.export = router
