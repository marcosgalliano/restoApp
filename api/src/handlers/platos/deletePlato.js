const { Plato } = require("../../db");

const deletePlato = async (req, res) => {
  const { id } = req.params;
  try {
    const plato = await Plato.findByPk(id);

    await plato.destroy();

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "No se puede borrar el plato" });
  }
};

module.exports = deletePlato;
