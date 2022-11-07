const router = require('express').Router()

const AdminControllers = require('../controllers/AdminControllers')
const AdminMiddleware = require('../controllers/Middleware/AdminMiddleware')


router.post(
    '/registration',
    AdminMiddleware.checkAdminData, 
    AdminMiddleware.checkPermission,
    AdminMiddleware.usernameIsValid,
    AdminControllers.newAdminRegistration
    )

module.exports = router