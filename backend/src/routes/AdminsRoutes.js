const route = require('express').Router()

const AdminControllers = require('../controllers/AdminControllers')
const ModuleControllers = require('../controllers/ModuleControllers')
const AdminMiddleware = require('../middlewares/AdminMiddlewares')
const ModuleMiddleware = require('../middlewares/ModuleMiddlewares')

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
    AdminMiddleware.confirmWebToken,
    AdminControllers.changePassword
)

route.post(
    '/modules',
    ModuleMiddleware.confirmWebToken,
    ModuleMiddleware.checkData,
    ModuleControllers.saveModule
)

route.get(
    '/modules',
    ModuleMiddleware.confirmWebToken,
    ModuleControllers.getModules
)

route.delete(
    '/modules',
    ModuleMiddleware.confirmWebToken,
    ModuleControllers.deleteModule
)

route.patch(
    '/modules',
    ModuleMiddleware.confirmWebToken,
    ModuleControllers.updateModule
)

module.exports = route