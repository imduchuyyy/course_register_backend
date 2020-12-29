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
const { getStudentId, viewTop3Semester } = require('./service/student')

const {
	sumStudent,
    sumClass,
	maxInstructor,
	averageStudentOfCourse
} = require('./service/faculty')

const {
	getNumberOfCourse,
    getNumberOfClass,
    getStudentByCourse,
    getStudentByClass,
    getNumberOfStudent
} = require('./service/aao_staff')

router.post(
	'/insert_class',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			const result = await insertClass(req.body)
			return res.status(200).json(result)
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
			if (current_user.USER_ROLE == 'instructor') {
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
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { current_user } = req 
			const id = await getStudentId(current_user.SSN)
			return res
				.status(200)
				.json(
					await viewClassAndDocument(id, req.body.semester)
				)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_class_of_course',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { current_user } = req 
			const id = await getStudentId(current_user.SSN)
			return res
				.status(200)
				.json(await viewClassOfCourse(id, req.body.semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/dashboard',
	authMiddleWare.decodeUser,
	async (req, res, next) => {
		try {
			const { current_user } = req 
			const result = {}
			if (current_user.USER_ROLE = 'student') {
				const id = await getStudentId(current_user.SSN)
				result.top3semester = await viewTop3Semester(id)
			} else if (current_user.USER_ROLE = 'instructor') {
				const id = await getInstructorId(current_user.SSN)
				const { semester } = req.body
				result.sumClass = await sumClassInstructor(id, semester)
				result.top5Class = await top5Class(id)
				result.top5Semester = await top5SemesterHighClass(id)
			} else if (current_user.USER_ROLE = 'faculty') {
				const { fcode, semester } = req.body 
				result.sumStudent = await sumStudent(semester, fcode)
				result.sumClass = await sumClass(semester, fcode)
				result.maxInstructor = await maxInstructor(semester, fcode)
			} else if (current_user.USER_ROLE = 'aao_staff') {
				const { course_id, semester } = req.body
				result.numberOfCourse = await getNumberOfCourse()
				result.numberOfClass = await getNumberOfClass()
				result.studentByCourse = await getStudentByCourse(semester)
				result.studentByClass = await getStudentByClass(course_id, semester)
				result.numberOfStudent = await getNumberOfStudent()
			} else throw "Invalid role"
			return res.status(200).json(result)
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/averageStudentOfCourse',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			const {course_id, semester} = req.body
			return res.status(200).json(await averageStudentOfCourse(course_id, semester))
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

module.exports = router
