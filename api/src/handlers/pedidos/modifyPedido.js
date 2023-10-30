const modifyPedidoController = require("../../controllers/pedidos/modifyPedidoController");

const modifyPedido = async (req, res) => {
  const { name, tableNumber, pedidoStatus, items } = req.body;
  const { id } = req.params;
  try {
    const modifiedPedido = await modifyPedidoController({
      name,
      tableNumber,
      pedidoStatus,
      items,
      id,
    });
    res.status(200).json(modifiedPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = modifyPedido;
