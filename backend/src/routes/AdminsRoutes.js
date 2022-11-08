const route = require('express').Router()

const AdminControllers = require('../controllers/AdminControllers')
const AdminMiddleware = require('../middlewares/AdminMiddlewares')

const ModuleControllers = require('../controllers/ModuleControllers')
const ModuleMiddleware = require('../middlewares/ModuleMiddlewares')

const ClassControllers = require('../controllers/ClassControllers')
const ClassMiddleware = require('../middlewares/ClassMiddlewares')

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

route.post(
    '/modules/class',
    ClassMiddleware.confirmWebToken,
    ClassMiddleware.checkData,
    ClassControllers.createClass
)

route.get(
    '/modules/class',
    ClassMiddleware.confirmWebToken,
    ClassControllers.getClass
)

route.delete(
    '/modules/class',
    ClassMiddleware.confirmWebToken,
    ClassControllers.deleteClass
)

route.patch(
    '/modules/class',
    ClassMiddleware.confirmWebToken,
    ClassControllers.updateClass
)

module.exports = route