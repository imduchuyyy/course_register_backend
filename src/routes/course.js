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

	listAllCourse,
	viewCourseDocument,
	viewSumStudent,
	courseInSemester,
	listClassOfCourse
} = require('./service/course')
const { getStudentId } = require('./service/student')
const { getInstructorId } = require('./service/instructor')

router.post(
	'/add_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			const result = await insertCourse(req.body)
			console.log(result)
			return res.status(200).json({ message: 'Success' })
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
			const { semester, fcode = 'F001' } = req.body
			let result
			if (semester == 'all') {
				result = await listAllCourse(fcode)
			} else {
				result = await courseInSemester(semester, fcode)
			}
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
			await registerCourse(req.body.course_id, student_id, req.body.semester)
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
			const { semester } = req.body
			const { current_user } = req 
			const id = await getStudentId(current_user.SSN)
			return res.status(200).json(await viewTotalCredit(id, semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_total_course_registed',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { semester } = req.body
			const { current_user } = req 
			const id = await getStudentId(current_user.SSN)
			return res
				.status(200)
				.json(await viewTotalCourseRegisted(id, semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_top_3_semeter',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { current_user } = req 
			const id = await getStudentId(current_user.SSN)
			return res.status(200).json(await viewTop3Semester(id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_course_document',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { semester, class_id } = req.body
			const { current_user } = req 
			const id = await getInstructorId(current_user.SSN)
			return res
				.status(200)
				.json(await viewCourseDocument(id, semester, class_id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_sum_student',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { semester, class_id } = req.body
			const { current_user } = req 
			const id = await getInstructorId(current_user.SSN)

			return res
				.status(200)
				.json(await viewSumStudent(id, semester, class_id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_class_of_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			const { course_id, semester } = req.body
			return res.status(200).json(await listClassOfCourse(course_id, semester))
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: err })
		}
	}
)

module.exports = router
