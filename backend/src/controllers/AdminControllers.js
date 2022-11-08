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

module.exports = {
    registerNewAdmin,
    login
}