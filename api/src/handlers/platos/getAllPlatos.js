const getAllPlatosController = require("../../controllers/platos/getAllPlatosController");

const getAllPlatos = async (req, res) => {
  try {
    const platos = await getAllPlatosController();
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPlatos;
