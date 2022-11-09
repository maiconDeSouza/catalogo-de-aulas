const AdminModels = require('../models/AdminModels')


async function registerNewAdmin(req, res){
    const newAdminData = req.newAdminData
    
    const saveNewAdmin = await AdminModels.saveNewAdmin(newAdminData)

    res.status(saveNewAdmin.status).json({
        message: saveNewAdmin.message
    })
}

async function login(req, res){
    const { _id } = req

    try {
        const webToken = await AdminModels.dataToGenerateToken(_id)  
        res.status(200).json({
            login: true,
            _id,
            message: `Login Realizado com Sucesso!`,
            webToken
        })
    } catch (error) {
        res.status(500).json({
            login: false,
            message: `Login não pode ser concluido com sucesso!`
        })
    } 
}

async function changePassword(req, res){
    const { password, newPassword, confirmNewPassword } = req.body
    const { decoded } = req

    if(newPassword !== confirmNewPassword){
        return res.status(422).json({message: `A senha e confirmação devem ser iguais!`})
    }
    const isValid = await AdminModels.validadePassword(decoded._id, password)

    if(!isValid){
        return res.status(422).json({
            message: `Senha Atual errada!`
        })
    }
    
    const up = await AdminModels.updatePassword(decoded._id, newPassword)
    
    if(up){
        return res.status(200).json({
            message: `Senha Atualizada com sucesso!`
        })
    } else {
         return res.status(422).json({
            message: `Erro ao atualizar senha!`
         })
    }
}

module.exports = {
    registerNewAdmin,
    login,
    changePassword
}