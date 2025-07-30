
//Simula o banco de dados de casos
const casos = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    titulo: "Operação Lava Jato",
    descricao: "Operação da Polícia Federal que investigou corrupção e lavagem de dinheiro envolvendo empresas e políticos no Brasil.",
    status: "aberto",
    agente_id: "d290f1ee-6c54-4b01-90e6-d701748f0851"
  }
];


function findAll() {
    return casos;
}

function findById(id){
    return casos.find(casos => casos.id === id);
}

function create(caso){
    casos.push(caso);
    return caso
}

function update(id, novosDados){
    const index = casos.findIndex(casos => casos.id === id);
    if(index !== -1){
        casos[index] = { id, ...novosDados };
        return casos[index];
    }
    return null;
}

function patch(id, campos){
    const caso = findById(id)
    if (caso) {
        Object.assign(caso, campos);
        return caso;
    }
    return null;
}

function remove(id){
    const index = casos.findIndex(caso => casos.id === id)
    if(index !== -1){
        casos.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    patch,
    remove
};