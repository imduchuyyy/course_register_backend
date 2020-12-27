const express = require('express')
const { authMiddleWare } = require('../middlewares')
const router = express.Router()
const {    
    addDocument,
    listDocument,
    updateDocument,
    deleteDocument,
    viewAssignedDocument} = require('./service/document')

router.post(
    '/add_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            await addDocument(req.body.ISBN, req.body.docName, req.body.publisherName)
            return res.status(200).json({})
        } catch (err) {
            return res.status(500).json({message: err})
        }
    }
)

router.post(
    '/list_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'FACULTY'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await listDocument(req.body.semester, req.body.faculty))
        } catch (err) {
            return res.status(500).json({message: err})
        }
    }
)

router.post(
    '/update_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            await updateDocument(req.body.ISBN, req.body.docName, req.body.publisherName)
            return res.status(200).json({})
        } catch (err) {
            return res.status(500).json({message: err})
        }
    }
)

router.post(
    '/delete_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'INSTRUCTOR'),
    async (req, res, next) => {
        try {
            await deleteDocument(req.body.ISBN, req.body.docName, req.body.publisherName)
            return res.status(200).json({})
        } catch (err) {
            return res.status(500).json({message: err})
        }
    }
)

router.post(
    '/view_assigned_document',
    (req, res, next) => authMiddleWare.checkAuth(req, res, next, 'AAO_STAFF'),
    async (req, res, next) => {
        try {
            return res.status(200).json(await viewAssignedDocument())
        } catch (err) {
            return res.status(500).json({message: err})
        }
    }
)

module.export = router