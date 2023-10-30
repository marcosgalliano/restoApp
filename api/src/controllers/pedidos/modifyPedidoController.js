const { Pedido } = require("../../db");

const modifyPedidoController = async (data) => {
  const { id, name, tableNumber, pedidoStatus, items } = data;

  const foundPedido = await Pedido.findByPk(id);

  if (!foundPedido) {
    return new Error("no se encontro el pedido");
  }

  foundPedido.name = name;
  foundPedido.tableNumber = tableNumber;
  foundPedido.pedidoStatus = pedidoStatus;
  foundPedido.items = items;

  await foundPedido.save();

  return foundPedido;
};

module.exports = modifyPedidoController;
