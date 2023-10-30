const { Pedido } = require("../../db");

const getAllPedidosController = async () => {
  const allPedidos = await Pedido.findAll();

  return allPedidos;
};

module.exports = getAllPedidosController;
