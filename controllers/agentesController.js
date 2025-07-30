const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

//GET dos agentes com as mensagens
function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAll();
    res.status(200).json(agentes);
}

//GET dos agentes por ID
function getAgentById(req, res) {
    const agente = agentesRepository.findById(req.params.id);
    if(!agente) {
        return res.status(404).json({message : "Agente não encontrado"});
    }

    return res.status(200).json(agente);
}

//POST dos agentes
function createAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if(!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({message:  "Parâmetros obrigatórios não correspondem."})
    }

    const novoAgente = {
        id: uuidv4(),
        nome,
        dataDeIncorporacao,
        cargo
    };

    agentesRepository.create(novoAgente);
    res.status(201).json(novoAgente);
}

//PUT dos agentes
function updateAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const updated = agentesRepository.update(req.params.id, { nome, dataDeIncorporacao, cargo });

    if(!updated) {
        res.status(404).json({message: "Agente não encontrado"});
    }

    res.status(200).json(updated);

}

//PATCH dos agented
function patchAgente(req, res) {
    const updated = agentesRepository.patch(req.params.id, req.body);

    if(!updated) {
        return res.status(404).json({message : "Agente não encontrado"});
    }

    res.status(200).json(updated);
}

//DELETE dos agentes
function deleteAgente(req, res) {
    const remove = agentesRepository.remove(req.params.id);

    if(!remove) {
        res.status(404).json({message:  "Agente não encontrado"});
    }

    res.status(204).send();
}

module.exports = {
    getAllAgentes,
    getAgentById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
};