const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    last_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "genre",
  }
);

module.exports = Author;
