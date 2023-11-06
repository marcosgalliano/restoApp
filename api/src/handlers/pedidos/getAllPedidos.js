const getAllPedidosController = require("../../controllers/pedidos/getAllPedidosController");

const getPedidos = async (req, res) => {
  const { name, table } = req.query;
  try {
    const allPedidos = await getAllPedidosController();

    if (name) {
      const filteredResults = allPedidos.filter((pedido) =>
        pedido.name.toLowerCase().includes(name.toLowerCase())
      );

      res.status(200).json(filteredResults);
    } else if (table) {
      const filteredResults = allPedidos.filter(
        (pedido) => pedido.tableNumber == table
      );
      res.status(200).json(filteredResults);
    } else {
      res.status(200).json(allPedidos);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPedidos;
