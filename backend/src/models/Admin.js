const mongoose = require('mongoose')


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

async function createAdmin(newAdminData){
    try {
        const newAdmin = await new Admin(newAdminData)
        await newAdmin.save()
        return `Usuário Criado com Sucesso!`
    } catch (error) {
        return error
    }
}

async function usernameIsValid(userName){
    return await Admin.findOne({userName},{userName: 1})
}

module.exports = {
    createAdmin,
    usernameIsValid
}