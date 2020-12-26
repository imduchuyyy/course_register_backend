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
	'/add_course',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
            await insertCourse(req.body)
            return res.status(200).json({})
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

            return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
	'/list_course_registed',
	(req, res, next) => authMiddleWare.checkAuth(req, res, next, 'ADMIN'),
	async (req, res, next) => {
		try {
		    console.log("list course registed")
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
            await registerCourse(req.body.course_id, req.body.student_id)
            return res.status(200).json({})
		} catch (err) {
			return res.status(500).json({ message: err })
		}
	}
)

router.post(
    '/view_courses',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'STUDENT'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await viewCourses(req.body.student_id))
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
            return res.status(200).json(await viewTotalCourseRegisted(student_id, semester))
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
            return res.status(200).json(await viewCourseDocument(staff_id, semester, class_id))
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
            return res.status(200).json(await viewSumStudent(staff_id, semester, class_id))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)



router.post(
    '/course_in_semeter',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await courseInSemester(req.body.semester, req.body.faculty))
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
)


module.exports = router
