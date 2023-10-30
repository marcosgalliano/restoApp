const { Pedido } = require("../../db");

const postPedidoController = async (data) => {
  const { name, tableNumber, items } = data;

  const newPedido = await Pedido.create({ name, tableNumber, items });

  return newPedido;
};

module.exports = postPedidoController;
