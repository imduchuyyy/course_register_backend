const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()

router.post(
	'/',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			console.log(req)
			return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/register_course',
        (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
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
    '/view_coures',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view course")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/view_total_credit',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view total credit")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/view_total_course_registed',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view total course registed")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/view_top_3_semeter',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view top 3 semeter")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)



router.post(
    '/view_course_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("view course document")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/view_sum_student',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("view sum student")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)



router.post(
    '/course_in_semeter',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
	try {
	    console.log("course in semeter")
	    return res.status(200).json({})
	} catch (err) {
	    return res.status(500).json({ message: err })
	}
    }
)


module.exports = router
