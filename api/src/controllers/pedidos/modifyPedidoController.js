const { Pedido } = require("../../db");

const modifyPedidoController = async (data) => {
  const { id, name, tableNumber, pedidoStatus, items } = data;

  const foundPedido = await Pedido.findByPk(id);

  if (!foundPedido) {
    return new Error("No se encontró el pedido");
  }

  if (name !== undefined) {
    foundPedido.name = name;
  }

  if (tableNumber !== undefined) {
    foundPedido.tableNumber = tableNumber;
  }

  if (pedidoStatus !== undefined) {
    foundPedido.pedidoStatus = pedidoStatus;
  }

  if (items !== undefined) {
    foundPedido.items = items;
  }

  await foundPedido.save();

  return foundPedido;
};

module.exports = modifyPedidoController;
