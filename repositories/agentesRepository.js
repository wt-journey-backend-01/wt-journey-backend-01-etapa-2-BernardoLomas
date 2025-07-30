const { v4: uuidv4 } = require('uuid');

const agentes = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    nome: "Bernardo Lomas",
    dataDeIncorporacao: "2000-01-01",
    cargo: "Delegado"
  }
];

// Retorna todos os agentes
function findAll() {
  return agentes;
}

// Busca um agente por ID
function findById(id) {
  return agentes.find(agente => agente.id === id);
}

// Cria um novo agente
function create(agente) {
  const newAgente = {
    id: uuidv4(),
    ...agente
  };
  agentes.push(newAgente);
  return newAgente;
}

// Atualiza completamente um agente (PUT)
function update(id, novosDados) {
  const index = agentes.findIndex(agente => agente.id === id);

  if (index !== -1) {
    agentes[index] = { id, ...novosDados };
    return agentes[index];
  }

  return null;
}

// Atualiza parcialmente um agente (PATCH)
function patch(id, campos) {
  const agente = findById(id);

  if (agente) {
    Object.assign(agente, campos);
    return agente;
  }

  return null;
}

// Remove um agente (DELETE)
function remove(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    agentes.splice(index, 1);
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
