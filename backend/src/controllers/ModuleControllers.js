const ModuleModels = require('../models/ModuleModels')

async function saveModule(req, res){
    const { newAdminData } = req

    const saveNewModule = await ModuleModels.saveNewModule(newAdminData)

    res.status(saveNewModule.status).json({
        message: saveNewModule.message,
        newModule: saveNewModule.newModule
    })
}

async function getModules(req, res){

    const modules = await ModuleModels.getAllModules()
    
    res.status(200).json({
        modules
    })
}

async function deleteModule(req, res){
    const { _id } = req.headers

    if(!_id){
        return res.status(422).json({
            message: `Precisa mandar o _ID`
        })
    }

    const modueleDeleted = await ModuleModels.deleteModuleId(_id)

    

    res.status(200).json({
        message: `Modulo Excluido com Sucesso!`
    })
}

async function updateModule(req, res){
    const { nameModule } = req.body
    const { _id } = req.headers

    if(!nameModule){
        return res.status(422).json({
            message: `Preencha o Campo`
        })
    }

    if(!_id){
        return res.status(422).json({
            message: `Precisa mandar o _ID`
        })
    }

    const module = await ModuleModels.updateModuleId(_id, nameModule)

    res.status(200).json({
        module
    })

}
module.exports = {
    saveModule,
    getModules,
    deleteModule,
    updateModule
}