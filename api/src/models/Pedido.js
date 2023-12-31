const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pedido",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pedidoStatus: {
        type: DataTypes.STRING,
        defaultValue: "Pendiente",
        allowNull: false,
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
