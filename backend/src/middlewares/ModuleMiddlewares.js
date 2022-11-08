const { v4: uuidv4 } = require('uuid')


const WebToken = require('../helpers/WebToken')
const DataValidationFunc = require('../helpers/DataValidationFunc')

const ModuleModels = require('../models/ModuleModels')



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

async function checkData(req, res, next){
    const { nameModule } = req.body

    
    const modules = await ModuleModels.getAllModules()
    
    const newModuleData = {
        _id: uuidv4(),
        nameModule,
        class: []
    }

    const usedObj = DataValidationFunc.validadeDataEntry(Object.values(newModuleData))
    if(usedObj.hasError){
        return res.status(usedObj.status).json(usedObj.message)
    }

    req.newAdminData = newModuleData

    next()
}

module.exports = {
    confirmWebToken,
    checkData
}