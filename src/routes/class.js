const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const {
	insertClass,
	listClass,
	viewClassAndDocument,
	viewClassByStudent,
	viewClassByTeacher,
	viewClass,
	viewClassInSemester,
	viewClassOfCourse,
	getDetailClass
} = require('./service/class')

const { getInstructorId } = require('./service/instructor')
const { getStudentId } = require('./service/student')

router.post(
	'/insert_class',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			const result = await insertClass(req.body)
			return res.status(200).json({ result })
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_class',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { semester } = req.body
			const { current_user } = req
			let result
			if (current_user.USER_ROLE == 'teacher') {
				const id = await getInstructorId(current_user.SSN)
				result = await viewClassByTeacher(id, semester)
			} else if (current_user.USER_ROLE == 'student') {
				const id = await getStudentId(current_user.SSN)
				result = await viewClassByStudent(id, semester)
			} else {
				result = await viewClass(semester)
			}
			return res.status(200).json(result)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_class',
	// (req, res, next) => authMiddleWare.decodeUser(),
	async (req, res, next) => {
		try {
			// Muốn định danh cho class, phải có thêm course_id
			const { course_id, class_id } = req.body
			return res.status(200).json(await getDetailClass(course_id, class_id))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_class_by_student',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'AAO_STAFF'),
	async (req, res, next) => {
		try {
			const result = await viewClassByStudent(
				req.body.student_id,
				req.body.semester
			)
			console.log(result)
			return res.status(200).json(result)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_class_by_teacher',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'AAO_STAFF'),
	async (req, res, next) => {
		try {
			return res
				.status(200)
				.json(
					await viewClassByTeacher(req.body.instructor_id, req.body.semester)
				)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_class_and_document',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
	async (req, res, next) => {
		try {
			return res
				.status(200)
				.json(
					await viewClassAndDocument(req.body.student_id, req.body.semester)
				)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_class_of_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
	async (req, res, next) => {
		try {
			return res
				.status(200)
				.json(await viewClassOfCourse(req.body.student_id, req.body.semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

module.exports = router
