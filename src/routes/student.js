const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const { listClass, listClassReigisted } = require('./service/class')
const { listCourse } = require('./service/course')
const { createStudent, listStudentByFaculty, viewTop3Semester } = require('./service/student')


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
    '/list_course',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            const { semeter } = req.body
            const result = await listCourse(semeter) 
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/list_student',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            const result = await listStudentByFaculty(req.body.fcode);
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)


router.post(
    '/view_student',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            console.log("list student")
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/list_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            const { semeter } = req.body
            listClass(semeter)
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/registe_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            const { semeter, idClass } = req.body
            return res.status(200).json({})
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/list_class_registed',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            const { semeter } = req.body
            const result = listClassReigisted(semeter)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)


module.exports = router

router.post(
    '/list_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            const { semeter } = req.body
            listClass(semeter)
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/registe_class',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            const { semeter, idClass } = req.body
            return res.status(200).json({})
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/list_class_registed',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            const { semeter } = req.body
            const result = listClassReigisted(semeter)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/create_student',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
    async (req, res, next) => {
        try {
            await createStudent(req.body)
            return res.status(200).json({ message: 'Success' })
        } catch (err) {
            return res.status(500).json({ message: 'Fail' })
        }
    }
)



module.exports = router
