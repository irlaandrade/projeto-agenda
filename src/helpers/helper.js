const incrementarId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
};

const conferirTelefone = (array, telefone) => {
    return array.find((contato) => contato.telefone == telefone);
};
 
module.exports = { 
    incrementarId, 
    conferirTelefone 
}