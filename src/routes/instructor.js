const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const {    
	insertInstructor,
    listInstructorInSemester,
    listInstructor,
    topInstructorNum,
	viewInChargedIntructor,
	listInstructorByFaculty } = require('./service/instructor')
	
router.post(
	'/insert_instructor_teach',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			await insertInstructor(req.body.idCourse, req.body.idClass, req.body.idInstructor, req.body.fromWeek, req.body.toWeek)
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
	    	return res.status(200).json(await listInstructorInSemester(req.body.semester, req.body.faculty))
		} catch (err) {
	    	return res.status(500).json({ message: err })
		}
    }
)

router.post(
    '/list_instructor',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
		try {
	    	return res.status(200).json(await listInstructor(req.body.idCourse, req.body.idClass, req.body.semester))
		} catch (err) {
	    	return res.status(500).json({ message: err })
		}
    }
)

router.post(
    '/top_instructor_num',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
		try {
	   		return res.status(200).json(await topInstructorNum(req.body.semester, req.body.faculty))
		} catch (err) {
	    	return res.status(500).json({ message: err })
		}
    }
)

router.post(
    '/view_in_charged_intructor',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'AAO_STAFF'),
    async (req, res, next) => {
		try {
	   		return res.status(200).json(await viewInChargedIntructor())
		} catch (err) {
	    	return res.status(500).json({ message: err })
		}
    }
)

router.post(
	'/list_instructor_by_faculty',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
		try {
	   		return res.status(200).json(await listInstructorByFaculty(req.body.fcode))
		} catch (err) {
	    	return res.status(500).json({ message: err })
		}
    }
)

module.exports = router