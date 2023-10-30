const postPedidoController = require("../../controllers/pedidos/postPedidoController");

const addPedido = async (req, res) => {
  const { name, tableNumber, items } = req.body;
  try {
    const addedPedido = await postPedidoController({ name, tableNumber, items });
    res.status(200).json(addedPedido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = addPedido;
