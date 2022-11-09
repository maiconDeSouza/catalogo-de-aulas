const route = require('express').Router()

const AdminControllers = require('../controllers/AdminControllers')
const AdminMiddlewares = require('../middlewares/AdminMiddlewares')

const ModuleControllers = require('../controllers/ModuleControllers')
const ModuleMiddlewares = require('../middlewares/ModuleMiddlewares')

const ClassControllers = require('../controllers/ClassControllers')
const ClassMiddlewares = require('../middlewares/ClassMiddlewares')

route.post(
    '/register', 
    AdminMiddlewares.checkData,
    AdminMiddlewares.checkPermission,
    AdminMiddlewares.checkUserName,
    AdminMiddlewares.checkCreatePermission, 
    AdminControllers.registerNewAdmin
)

route.post(
    '/login',
    AdminMiddlewares.checkDataLogin,
    AdminControllers.login
)

route.put(
    '/changepass',
    AdminMiddlewares.confirmWebToken,
    AdminControllers.changePassword
)

route.post(
    '/modules',
    ModuleMiddlewares.confirmWebToken,
    ModuleMiddlewares.checkData,
    ModuleControllers.saveModule
)

route.get(
    '/modules',
    ModuleMiddlewares.confirmWebToken,
    ModuleControllers.getModules
)

route.delete(
    '/modules',
    ModuleMiddlewares.confirmWebToken,
    ModuleControllers.deleteModule
)

route.patch(
    '/modules',
    ModuleMiddlewares.confirmWebToken,
    ModuleControllers.updateModule
)

route.post(
    '/modules/class',
    ClassMiddlewares.confirmWebToken,
    ClassMiddlewares.checkData,
    ClassControllers.createClass
)

route.get(
    '/modules/class',
    ClassMiddlewares.confirmWebToken,
    ClassControllers.getClass
)

route.delete(
    '/modules/class',
    ClassMiddlewares.confirmWebToken,
    ClassControllers.deleteClass
)

route.patch(
    '/modules/class',
    ClassMiddlewares.confirmWebToken,
    ClassControllers.updateClass
)

module.exports = route