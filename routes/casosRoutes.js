const express = require('express');
const router = express.Router();
const casosController = require("../controllers/casosController");

router.get("/", casosController.getAllcasos);
router.get("/:id", casosController.getCasoById);
router.post("/", casosController.createCaso);
router.put("/:id", casosController.updateCasos);
router.patch("/:id", casosController.patchCaso);
router.delete("/:id", casosController.deleteCaso);

module.exports = router;
