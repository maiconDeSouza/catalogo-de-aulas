const ClassModulesModels = require('../models/ClassModulesModels')

async function createClass(req, res){
    const { module_id } = req.headers
    const { newClassData } = req

    const newClass = await ClassModulesModels.saveNewClass(module_id, newClassData)

    res.status(201).json({
        newClass
    })
}

async function getClass(req, res){
    const { module_id } = req.headers

    if(!module_id ){
        return res.status(422).json({
            message: `O ID do Modulo está faltando`
        })
    }

    const classes = await ClassModulesModels.getClassId(module_id)

    res.status(200).json({
        classes
    })

}

async function deleteClass(req, res){
    const { module_id, class_id } = req.headers

    if(!module_id || !class_id){
        res.status(422).json({
            message: `Esta faltando o ID do Modulo ou da Aula`
        })
    }

    const module = await ClassModulesModels.deleteClassId(module_id, class_id)

    res.status(module.status).json(module)
}

async function updateClass(req, res){
    const { module_id, class_id } = req.headers
    const { nameClass, classDate } = req.body

    if(!module_id || !class_id){
        res.status(422).json({
            message: `Esta faltando o ID do Modulo ou da Aula`
        })
    }

    if(!nameClass || !classDate){
        res.status(422).json({
            message: `Preencha todos os campos!`
        })
    }

    const ids = {
        module_id,
        class_id
    }

    const data = {
        nameClass,
        classDate
    }

    const module = await ClassModulesModels.updateClassId(ids, data)

    res.status(module.status).json(module)
}

module.exports = {
    createClass,
    getClass,
    deleteClass,
    updateClass
}
