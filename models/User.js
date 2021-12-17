const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notContains: " ",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6] },
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(30),
    },
    favorite_genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "genre",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate(user) {
        return bcrypt.hash(user.password, 10).then((hashedPw) => {
          user.password = hashedPw;
        });
      },
      beforeUpdate(user) {
        return bcrypt.hash(user.password, 10).then((hashedPw) => {
          user.password = hashedPw;
        });
      },
      beforeBulkCreate(users, options) {
        for (const user of users) {
          return bcrypt.hash(user.password, 10).then((hashedPw) => {
            user.password = hashedPw;
          });
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
