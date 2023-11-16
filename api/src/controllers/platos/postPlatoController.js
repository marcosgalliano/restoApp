const { Plato } = require("../../db");

const createNewPlato = async (data) => {
  const { name, price, bebida } = data;

  const newPlato = await Plato.create({ name, price, bebida });

  return newPlato;
};

module.exports = createNewPlato;
