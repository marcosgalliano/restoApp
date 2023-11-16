const { Plato } = require("../../db");

const getPlatoById = async (id) => {
  const platoEncontrado = await Plato.findByPk(id);

  return platoEncontrado;
};

module.exports = getPlatoById;
