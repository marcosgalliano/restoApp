const { Router } = require("express");
const getAllPedidos = require("../../handlers/pedidos/getAllPedidos");
const addPedido = require("../../handlers/pedidos/postPedido");
const modifyPedido = require("../../handlers/pedidos/modifyPedido");

const pedidosRouter = Router();

pedidosRouter.get("/", getAllPedidos);
pedidosRouter.post("/", addPedido);
pedidosRouter.put("/:id", modifyPedido);

module.exports = pedidosRouter;
