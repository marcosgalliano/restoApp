const { Plato } = require("../../db");

const createNewPlato = async (data) => {
  const { name, price } = data;

  const newPlato = await Plato.create({ name, price });

  return newPlato;
};

module.exports = createNewPlato;

/* const { Pokemon } = require("../db"); // llamamos al modelo pokemon

const createNewPokemon = async (data) => {
  const { name, image, attack, defense, hp, types } = data;

  // creamos el pokemon con sus respectivos datos
  const newPokemon = await Pokemon.create({ name, image, attack, defense, hp });

  // le agregamos al nuevo pokemon sus types
  await newPokemon.addTypes(types);

  return newPokemon;
};

module.exports = createNewPokemon; */
