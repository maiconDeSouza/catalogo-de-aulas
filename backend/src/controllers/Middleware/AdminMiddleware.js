const generateID = require('../../helpers/uuid')
const EncryptPassword = require('../../helpers/EncryptPassword')

const AdminModels = require('../../models/Admin')


async function checkAdminData(req, res, next){
    const { fullName, userName, password, confirmPassword } = req.body

    if(password !== confirmPassword){
        return res.status(422).json({
            message: "Digite duas senha iguais!"
        })
    }

    const newAdminData = {
        _id: generateID(),
        fullName,
        userName,
        password : await EncryptPassword.create(password),
        permission : "basic"
    }

    for(let props in newAdminData){
        if(!newAdminData[props]){
            return res.status(422).json({message: `O ${props} é obrigatório`})
        }
    }

    req.newAdminData = newAdminData

    next()
}


function checkPermission(req, res, next){
    const  newAdminData  = req.newAdminData

    if(newAdminData.permission !== 'basic'){
        return res.status(422).json({
            message: "Permissão diferente da padrão"
        })
    }

    next()
}

async function usernameIsValid(req, res, next){
    const { userName } = req.newAdminData

    const isValid = await AdminModels.usernameIsValid(userName)

    if(isValid){
        return res.status(422).json({
            message: `Nome de Usuário já está em uso.`,
            userName: isValid.userName
        })
    }

    next()
}

module.exports = {
    checkAdminData,
    checkPermission,
    usernameIsValid
}