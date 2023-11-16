const { Plato } = require("../../db");

const modifyPlatoController = async (data) => {
  const { id, name, price, bebida } = data;
  const foundPlato = await Plato.findByPk(id);

  if (!foundPlato) {
    return new Error("no se encontro el plato");
  }

  if (foundPlato.name != undefined) {
    foundPlato.name = name;
  }

  if (foundPlato.price != undefined) {
    foundPlato.price = price;
  }

  if (foundPlato.bebida != undefined) {
    foundPlato.bebida = bebida;
  }

  await foundPlato.save();

  return foundPlato;
};

module.exports = modifyPlatoController;
