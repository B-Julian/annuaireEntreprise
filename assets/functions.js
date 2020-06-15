exports.success = (result) => {
    return {
        status: 'success',
        result: result
    }
}

exports.error = (message) => {
    return {
        status: 'error',
        message: message
    }
}

exports.checkResult = (result) => {
    if (result != "")
        return {
            status: 'success',
            result: result
        }
    else
        return {
            status: 'error',
            result: 'Aucun résultat'
        }
}