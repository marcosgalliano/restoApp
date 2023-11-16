const getAllPlatosController = require("../../controllers/platos/getAllPlatosController");
const getPlatoById = require("../../controllers/platos/getPlatoByIdController");

const getAllPlatos = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const platoEncontrado = await getPlatoById(id);
      res.status(200).json(platoEncontrado);
    } else {
      const platos = await getAllPlatosController();
      res.status(200).json(platos);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPlatos;
