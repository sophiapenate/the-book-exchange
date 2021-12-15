const User = require("./User");
const Genre = require("./Genre");
const Author = require("./Author");
const Book = require("./Book");
const Offer = require("./Offer");

Author.hasMany(Book, {
  foreignKey: "author_id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});

Genre.hasMany(Book, {
  foreignKey: "genre_id",
});

Book.belongsTo(Genre, {
  foreignKey: "genre_id",
});

module.exports = {
  User,
  Genre,
  Author,
  Book,
  Offer,
};
