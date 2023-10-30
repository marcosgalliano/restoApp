const { Plato } = require("../../db");

const modifyPlatoController = async (data) => {
  const { id, name, price } = data;
  const foundPlato = await Plato.findByPk(id);

  if (!foundPlato) {
    return new Error("no se encontro el plato");
  }

  foundPlato.name = name;
  foundPlato.price = price;

  await foundPlato.save();

  return foundPlato;
};

module.exports = modifyPlatoController;
