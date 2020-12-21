const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()

router.post(
    '/view_list_student',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("view list student")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

