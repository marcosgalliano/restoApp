const { Plato } = require("../../db");

const getAllPlatos = async () => {
  const allPlatos = await Plato.findAll({
    order: [["name", "ASC"]],
  });

  // Ordenar alfabéticamente
  allPlatos.sort((a, b) => a.name.localeCompare(b.name));

  allPlatos.sort((a, b) => (b.bebida === true) - (a.bebida === true));

  return allPlatos;
};

module.exports = getAllPlatos;
