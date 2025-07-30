const casosRepository = require('../repositories/casosRepository');
const { v4: uuidv4 } = require('uuid');

//GET dos casos
function getAllcasos (req, res) {
    const casos = casosRepository.findAll();
    res.status(200).json(casos);
}

//GET dos casos por ID
function getCasoById (req, res) {
    const caso = casosRepository.findById(req.params.id);
    if(!caso) {
        res.status(404).json({message: "Caso não encontrado"});
    }
    res.status(200).json(caso)
}

//POSTS dos casos
function createCaso (req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id ) {
        res.status(400).json({message:  "O caso não segue os parâmetros obrigatórios."})
    }

    if(status !== "aberto" && status !== "solucionado") {
        return res.status(400).json({
            status: 400,
            message: "Situação do caso inválida.",
            errors: { status: "O campo 'status' pode ser preenchido somente com 'aberto' ou 'solucionado'."}
        });
    }

    const novoCaso = {
        id: uuidv4(),
        titulo,
        descricao,
        status,
        agente_id
    }

    casosRepository.create(novoCaso);
    res.status(201).json(novoCaso);
}

//PUT dos casos 
function updateCasos(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    if (status && status !== "aberto" && status !== "solucionado") {
        return res.status(400).json({
            status: 400,
            message: "Status inválido",
            errors: { status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'."}
        });
    }

    const updated = casosRepository.update(req.params.id, {
        titulo, descricao, status, agente_id
    });

    if(!updated) {
        return res.status(404).json({message: "Caso não encontrado" });
    }

    res.status(200).json(updated);
}

//PATCH dos casos
function patchCaso(req, res) {
    const campos = req.body;

    if(campos.status && campos.status !== "aberto"  && campos.status !== "solucionado") {
        return res.status(400).json({
            status: 400,
            message: "Status inválido",
            errors: { status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'."}
        });
    }

    const updated = casosRepository.patch(req.params.id, campos);

    if(!updated) {
        res.status.json(404).json({message: "Caso não encontrado" });
    }

    res.status.json(200).json(updated);
}

//DELETE dos casos
function deleteCaso(req, res) {
    const removed = casosRepository.remove(req.params.id);

    if(!removed) {
        return res.status(404).json({message: "Caso não encontrado "});
    }

    res.status(204).send();
}

module.exports = {
    getAllcasos,
    getCasoById,
    createCaso,
    updateCasos,
    patchCaso,
    deleteCaso,
};