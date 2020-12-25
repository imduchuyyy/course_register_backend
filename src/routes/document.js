const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()

router.post(
    '/add_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("add document")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/list_document_by_course',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("add document")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/update_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("update document")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

router.post(
    '/delete_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            console.log("delete document")
            return res.status(200).json(req)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
)

module.export = router
