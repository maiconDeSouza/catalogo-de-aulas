const { v4: uuidv4 } = require('uuid')

function generateID(){
    return uuidv4()
}

module.exports = generateID