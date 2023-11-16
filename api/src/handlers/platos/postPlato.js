const createNewPlato = require("../../controllers/platos/postPlatoController");

const postPlato = async (req, res) => {
  const { name, price, bebida } = req.body;
  try {
    const createdPlato = await createNewPlato({ name, price, bebida });
    res.status(200).json(createdPlato);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = postPlato;
