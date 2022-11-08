const { v4: uuidv4 } = require('uuid')

const EncryptPassword = require('../helpers/EncryptPassword')
const DataValidationFunc = require('../helpers/DataValidationFunc')
const WebToken = require('../helpers/WebToken')

const AdminModels = require('../models/AdminModels')

async function checkData(req, res, next){
    const { fullName, userName, password, confirmPassword } = req.body

    

    const newAdminData = {
        _id: uuidv4(),
        fullName,
        userName,
        password : await EncryptPassword.create(password),
        permission: 'basic'
    }

    const usedObj = DataValidationFunc.validadeDataEntry(Object.values(newAdminData))
    if(usedObj.hasError){
        return res.status(usedObj.status).json(usedObj.message)
    }

    if(password !== confirmPassword){
        return res.status(422).json({message: `A senha e confirmação devem ser iguais!`}) 
    }
    
    const lengthUserName = DataValidationFunc.lengthUserName(userName)
    if(lengthUserName.hasError){
        return res.status(lengthUserName.status).json(lengthUserName.message)
    }

    const lengthPassword = DataValidationFunc.lengthPassword(password)
    if(lengthPassword.hasError){
        return res.status(lengthPassword.status).json(lengthPassword.message)
    }

    req.newAdminData = newAdminData

    next()
}

function checkPermission(req, res, next){
    if(req.newAdminData.permission !== 'basic'){
        res.status(422).json({
            message: `Permissão inválida para este Admin`
        })
    }

    next()
}

async function checkUserName(req, res, next){
    const { userName } = req.newAdminData

    const existsUserName = await AdminModels.simpleQueryUserName(userName)

    if(existsUserName){
       return res.status(422).json({
            message: `UserName já está em uso!!!`
        })
    }
    
    next()
}

async function checkCreatePermission(req, res, next){
    try {
        const decoded = await WebToken.verify(req.headers.authorization)
        if(decoded.permission === 'entire'){
           return next()
        }
        return res.status(422).json({
            message: `usuário sem permissão para essa operação`
        })
    } catch (error) {
       return res.status(422).json({
            message: `Token Invalido`
        })
    }
    
    
}


async function checkDataLogin(req, res, next){
    const { userName, password } = req.body

    const loginData = {
        userName,
        password
    }

    
    const usedObj = DataValidationFunc.validadeDataEntry(Object.values(loginData))
    
    if(usedObj.hasError){
        return res.status(usedObj.status).json(usedObj.message)
    }

    const follow = await AdminModels.validadePassAndUserName(loginData)
    
    if(follow.login){
        req._id = follow._id
        return next()
    }
    return res.status(follow.status).json({
        message: follow.message
    })
}

async function confirmWebToken(req, res, next){
    try {
        const decoded = await WebToken.verify(req.headers.authorization)
        req.decoded = decoded
        return next()
    } catch (error) {
       return res.status(422).json({
            message: `Token Invalido`
        })
    }
}


module.exports = {
    checkData,
    checkPermission,
    checkUserName,
    checkCreatePermission,
    checkDataLogin,
    confirmWebToken
}