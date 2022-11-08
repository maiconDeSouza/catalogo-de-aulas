

function validadeDataEntry(arrayOfValues){
    for(let value of arrayOfValues){
        if(!value){
            return {
                hasError: true,
                status: 422,
                message: `Preencha todos os Campos!`
            }
        }
    }
    return {
        hasError: false
    }
}

function lengthUserName(userName){
    if(userName.length < 3){
        return {
            hasError: true,
            status: 422,
            message: `O nome de usuário deve ter 3 ou mais caracteres!`
        }
    } else {
        return {
            hasError: false
        }
    }
}

function lengthPassword(password){
    if(password.length < 3){
        return {
            hasError: true,
            status: 422,
            message: `A senha deve ter 3 ou mais caracteres!`
        }
    } else{
        return {
            hasError: false
        }
    }
}



module.exports = {
    validadeDataEntry,
    lengthUserName,
    lengthPassword
}