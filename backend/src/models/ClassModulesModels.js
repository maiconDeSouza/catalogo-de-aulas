const { Module } = require('../models/ModuleModels')

async function saveNewClass(_id, newClass){
    const module = await Module.findById(_id)

    module.class.push(newClass)

    module.save()

    return {
        message: `Aula Salva com Sucesso!`,
        module
    }
}

async function getClassId(module_id){
    const module = await Module.findById(module_id)

    const classes = module.class

    return classes
}

async function deleteClassId(module_id, class_id){
    const module = await Module.findById(module_id)
    
    const index = module.class.findIndex( e => e._id === class_id)
    if(index < 0){
        return {
            status: 404,
            message: `Item não foi encontrado`
        }
    }

    module.class.splice(index, 1)
    module.save()

    return {
        status: 200,
        message: `Aula excluida com sucesso!`,
        module
    }
}

async function updateClassId(ids, data){
    const module = await Module.findById(ids.module_id)
    
    const index = module.class.findIndex( e => e._id === ids.class_id)
    if(index < 0){
        return {
            status: 404,
            message: `Item não foi encontrado`
        }
    }

    const newModule = module.class[index]
    
    newModule.nameClass = data.nameClass
    newModule.classDate = data.classDate

    module.class.splice(index, 1, newModule)

    
    module.save()

    return {
        status: 200,
        message: `Itens Atualizados com sucesso!`,
        module
    }

}

module.exports = {
    saveNewClass,
    getClassId,
    deleteClassId,
    updateClassId
}