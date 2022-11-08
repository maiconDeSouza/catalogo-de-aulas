const bcrypt = require('bcrypt')


async function create(password){
    const salt = await bcrypt.genSaltSync(12)
    return await bcrypt.hash(password, salt)
}

async function comparePassword(password, encryptPassword){
    return await bcrypt.compare(password, encryptPassword)
}

module.exports = {
    create,
    comparePassword
}