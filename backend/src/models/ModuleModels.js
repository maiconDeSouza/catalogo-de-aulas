const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nameModule:{
        type: String,
        required: true
    },
    class:{
        type: Array,
        required: true
    }
})

const Module = mongoose.model('Module', schema)

async function saveNewModule(newModuleData){
    try {
        const newModule = await new Module(newModuleData)
        newModule.save()
        return {
            status: 201,
            message: `Modulo Salvo com sucesso`,
            newModule
        }
    } catch (error) {
        return {
            status: 500,
            message: `Ocorreu um erro no servidor!`
        }
    }
}

async function getAllModules(){
    const modules = await Module.find()

    return modules
}

async function deleteModuleId(_id){

    const modueleDeleted = await Module.findByIdAndDelete(_id)

    return modueleDeleted
}

async function updateModuleId(_id, nameModule){

    const module = await Module.findById(_id)

    module.nameModule = nameModule

    module.save()

    return {
        message: `Modulo atualizado om sucesso`,
        module
    }
}

module.exports = {
    Module,
    saveNewModule,
    getAllModules,
    deleteModuleId,
    updateModuleId
}