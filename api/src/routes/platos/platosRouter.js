const { Router } = require("express");
const getAllPlatos = require("../../handlers/platos/getAllPlatos");
const postPlato = require("../../handlers/platos/postPlato");
const modifyPlato = require("../../handlers/platos/modifyPlato");
const deletePlato = require("../../handlers/platos/deletePlato");

const platosRouter = Router();

platosRouter.get("/", getAllPlatos);
platosRouter.post("/", postPlato);
platosRouter.put("/:id", modifyPlato);
platosRouter.delete("/:id", deletePlato);

module.exports = platosRouter;
