const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()

const { insertClass, 
        listClass, 
        viewClassAndDocument,
        
        viewClassInSemester,
        viewClassOfCourse,
        sumClassInstructor,
        top5Class,
        top5SemesterHighClass } = require('./service/class')

router.post(
	'/insert_class',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			await insertClass(req.body)
			return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_class',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
	async (req, res, next) => {
		try {
			return res.status(200).json(await listClass(req.body.semester, req.body.fcode))
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
            return res.status(200).json(await viewClassAndDocument(req.body.student_id, req.body.semester))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)

router.post(
    '/view_class_by_student',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view class by student")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/view_class_by_teacher',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view class by teacher")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/view_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("view class")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)


router.post(
    '/view_class_in_semeter',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await viewClassInSemester(req.body.student_id, req.body.semester))
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
            return res.status(200).json(await viewClassOfCourse(req.body.student_id, req.body.semester))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)


router.post(
    '/sum_class_of_instructor',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await sumClassInstructor(req.body.instructor_id, req.body.semester))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)

router.post(
    '/top_5_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await top5Class(req.body.instructor_id))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)

router.post(
    '/top_5_semeter_high_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await top5SemesterHighClass(req.body.instructor_id))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)

module.exports = router
