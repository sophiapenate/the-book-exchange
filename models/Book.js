const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "author",
        key: "id",
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "genre",
        key: "id",
      },
    },
    is_paperback: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["Like New", "Good", "Well-loved"]],
      },
    },
    description: {
      type: DataTypes.STRING(1200),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "book",
  }
);

module.exports = Book;
