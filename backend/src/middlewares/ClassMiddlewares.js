const { v4: uuidv4 } = require('uuid')


const WebToken = require('../helpers/WebToken')
const DataValidationFunc = require('../helpers/DataValidationFunc')

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
    const { nameClass, classDate } = req.body 
    
    const newClassData = {
        _id: uuidv4(),
        nameClass,
        classDate
    }

    const usedObj = DataValidationFunc.validadeDataEntry(Object.values(newClassData))
    if(usedObj.hasError){
        return res.status(usedObj.status).json(usedObj.message)
    }

    req.newClassData = newClassData

    next()
}

module.exports = {
    confirmWebToken,
    checkData
}