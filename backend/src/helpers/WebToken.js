require('dotenv').config()
const jwt = require('jsonwebtoken')

async function create(objAdmin){
    const webToken = await jwt.sign(objAdmin, process.env.SECRET_OR_PRIVATEKEY,{
        subject: objAdmin._id,
        expiresIn: "480s"
    })

    return webToken
}

async function verify(webToken){
    if(!webToken){
        res.status(401).json({message: `Usuário não autenticado`})
    }

    const token = webToken.split(' ')[1]

    const decoded = await jwt.verify(token, process.env.SECRET_OR_PRIVATEKEY)

    return decoded
}

module.exports = {
    create,
    verify
}