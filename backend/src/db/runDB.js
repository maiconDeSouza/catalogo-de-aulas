const mongoose = require('mongoose')

async function runDB(){
    try {
        await mongoose.connect('mongodb://localhost:27017/class-catalog')
        console.log(`Conectou ao DB`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = runDB