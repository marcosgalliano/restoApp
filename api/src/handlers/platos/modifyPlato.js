const modifyPlatoController = require("../../controllers/platos/modifyPlatoController");

const modifyPlato = async (req, res) => {
  const { id } = req.params;
  const { name, price, bebida } = req.body;
  try {
    const modifiedPlato = await modifyPlatoController({ id, name, price, bebida });
    res.status(200).json(modifiedPlato);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = modifyPlato;
