const adminModels = require('../models/Admin')

async function newAdminRegistration(req, res){
    const newAdminData = req.newAdminData

    const createdAdmin = await adminModels.createAdmin(newAdminData)
    

    res.status(201).json({
        message: createdAdmin
    })
}

module.exports = {
    newAdminRegistration
}