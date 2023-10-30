const { Plato } = require("../../db");

const getAllPlatos = async () => {
  const allPlatos = await Plato.findAll();

  return allPlatos;
};

module.exports = getAllPlatos;
