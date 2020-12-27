const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const {
	insertCourse,
	listCourse,
	listCourseRegisted,
	registerCourse,
	viewCourses,
	viewTotalCredit,
	viewTotalCourseRegisted,
	viewTop3Semester,
	viewCourseDocument,
	viewSumStudent,
	courseInSemester
} = require('./service/course')

router.post(
	'/add_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
			const result = await insertCourse(req.body)
			return res.status(200).json({ result })
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
			// TODO : tra ve danh sach cac mon hoc cua khoa, hoc ki do
			const { semester, faculty } = req.body
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
			// TODO : nhan vao id cua mon hoc tra ve tat ca lop hoc cua mon hoc do

			return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_course_registed',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
	async (req, res, next) => {
		try {
			// TODO: list cac mon hoc ma 1 sinh vien dang ki ( ) + tong so tin chi
			const { current_user } = req
			console.log('list course registed')
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
			//TODO: tra ve message dang ki thanh cong hoac that bai cho client
			await registerCourse(req.body.course_id, req.body.student_id)
			return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/view_total_credit',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
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
