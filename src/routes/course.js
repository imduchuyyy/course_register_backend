const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const {
	insertCourse,
	listCourse,
	listCourseRegistered,
	registerCourse,
	viewCourses,
	viewTotalCredit,
	viewTotalCourseRegisted,
	viewTop3Semester,
	viewCourseDocument,
	viewSumStudent,
	courseInSemester
} = require('./service/course')
const { getStudentId } = require('./service/student')

router.post(
	'/add_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			const result = await insertCourse(req.body)
			console.log(result)
			return res.status(200).json(result)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			const { semester, faculty = 'F001' } = req.body
			const result = await courseInSemester(semester, faculty)
			return res.status(200).json(result)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			const { id } = req.body
			return res.status(200).json(await viewCourses(id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_course_registered',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { current_user } = req
			const student_id = await getStudentId(current_user.SSN)
			if (student_id == null)
				return res.status(500).json({ message: 'Invalid SSN' })
			const { semester } = req.body
			const result = await listCourseRegistered(student_id, semester)
			return res.status(200).json(result)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/register_course',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { current_user } = req
			const { SSN } = current_user
			const student_id = await getStudentId(SSN)
			if (student_id == null)
				return res.status(500).json({ message: 'Invalid SSN' })
			await registerCourse(req.body.course_id, student_id)
			return res.status(200).json({ message: 'Success' })
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_total_credit',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { student_id, semester } = req.body
			return res.status(200).json(await viewTotalCredit(student_id, semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_total_course_registed',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
	async (req, res, next) => {
		try {
			const { student_id, semester } = req.body
			return res
				.status(200)
				.json(await viewTotalCourseRegisted(student_id, semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_top_3_semeter',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
	async (req, res, next) => {
		try {
			return res.status(200).json(await viewTop3Semester(req.body.student_id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_course_document',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
	async (req, res, next) => {
		try {
			const { staff_id, semester, class_id } = req.body
			return res
				.status(200)
				.json(await viewCourseDocument(staff_id, semester, class_id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_sum_student',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
	async (req, res, next) => {
		try {
			const { staff_id, semester, class_id } = req.body
			return res
				.status(200)
				.json(await viewSumStudent(staff_id, semester, class_id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

module.exports = router
