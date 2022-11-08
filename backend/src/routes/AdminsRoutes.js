const route = require('express').Router()

const AdminControllers = require('../controllers/AdminControllers')
const AdminMiddleware = require('../middlewares/AdminMiddlewares')

route.post(
    '/register', 
    AdminMiddleware.checkData,
    AdminMiddleware.checkPermission,
    AdminMiddleware.checkUserName,
    AdminMiddleware.checkCreatePermission, 
    AdminControllers.registerNewAdmin
)

route.post(
    '/login',
    AdminMiddleware.checkDataLogin,
    AdminControllers.login
)

route.put(
    '/changepass',

)

module.exports = route