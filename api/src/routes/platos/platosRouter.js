const { Router } = require("express");
const getAllPlatos = require("../../handlers/platos/getAllPlatos");
const postPlato = require("../../handlers/platos/postPlato");
const modifyPlato = require("../../handlers/platos/modifyPlato");

const platosRouter = Router();

platosRouter.get("/", getAllPlatos);
platosRouter.post("/", postPlato);
platosRouter.put("/:id", modifyPlato);

module.exports = platosRouter;
