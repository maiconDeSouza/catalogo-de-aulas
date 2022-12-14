const mongoose = require('mongoose')

const WebToken = require('../helpers/WebToken')
const EncryptPassword = require('../helpers/EncryptPassword')

const schema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Admin = mongoose.model('Admin', schema)


async function saveNewAdmin(newAdminData){
    try {
        const newAdmin = await new Admin(newAdminData)
        await newAdmin.save()
        return {
            status: 201,
            message: `Novo Admin Salvo com sucesso!`
        }
    } catch (error) {
        return {
            status: 500,
            message: `Ocorreu um erro no servidor!`
        }
    }
}

async function simpleQueryUserName(userName){
    try {
        const existsUserName = await Admin.findOne({userName},{userName:1})
        if(existsUserName){
            return {
                test: true,
                status: 422,
                message: `Nome de usuário Já está em Uso!`
            }
        } else {
            return {
                test: false,
                status: 200,
                message: `Nome de usuário liberado!`
            }
        }
        
    } catch (error) {
        return {
            test: true,
            status: 500,
            message: `Erro no servidor!`
        }
    }
}

async function validadePassAndUserName(loginDataObj){
    const userName = await Admin.findOne({userName: loginDataObj.userName}, {userName: 1, password: 1})

    if(!userName){
        return {
            status: 404,
            login: false,
            message: `Usuario ou Senha Não encontrados`
        }
    }

    const isValidPassword = await EncryptPassword.comparePassword(loginDataObj.password, userName.password)
    
    if(!isValidPassword){
        return {
            status: 404,
            login: false,
            message: `Usuario ou Senha Não encontrados`
        }
    }

    return {
        status: 200,
        login: true,
        message: `Login Confirmado`,
        _id: userName._id
    }
}

async function dataToGenerateToken(_id){
    const admin = await Admin.findById({_id}, {password: 0, createdAt: 0, updatedAt: 0})
    const objAdmin = {
        _id: admin._id,
        fullName: admin.fullName,
        userName: admin.userName,
        permission: admin.permission
    }
    const webToken = await WebToken.create(objAdmin)

    return webToken
}

async function validadePassword(_id, password){
    const currentPassword = await Admin.findById({_id}, {password: 1})
    
    const comparePassword = await EncryptPassword.comparePassword(password, currentPassword.password)
    
    return comparePassword
}

async function updatePassword(_id, newPassword){
    const encryptPassword = await EncryptPassword.create(newPassword)
    const up = await Admin.findByIdAndUpdate({_id}, {password: encryptPassword}, {new: true})

    
    if(up){
        return true
    } else{
        return false
    }
}

module.exports = {
    saveNewAdmin,
    simpleQueryUserName,
    validadePassAndUserName,
    dataToGenerateToken,
    validadePassword,
    updatePassword
}

