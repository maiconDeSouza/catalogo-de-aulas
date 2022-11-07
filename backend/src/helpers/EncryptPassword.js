const bcrypt = require('bcrypt')


async function create(password){
    const salt = await bcrypt.genSaltSync(12)
    return await bcrypt.hash(password, salt)
}

async function checkPassword(password, user){
    return await bcrypt.compare(password, user.password)
}

module.exports = {
    create,
    checkPassword
}