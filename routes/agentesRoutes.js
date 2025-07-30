const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

// GET todos os agentes
router.get("/", agentesController.getAllAgentes);

// GET por ID
router.get("/:id", agentesController.getAgentById);

// POST
router.post("/", agentesController.createAgente);

// PUT
router.put("/:id", agentesController.updateAgente);

// PATCH
router.patch("/:id", agentesController.patchAgente);

// DELETE
router.delete("/:id", agentesController.deleteAgente);

module.exports = router;
