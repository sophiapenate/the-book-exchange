const User = require("./User");
const Genre = require("./Genre");
const Author = require("./Author");
const Book = require("./Book");
const Offer = require("./Offer");

// Book to User Associations
User.hasMany(Book, {
  foreignKey: "user_id",
});

Book.belongsTo(User, {
  foreignKey: "user_id",
});

// Offer to User Associations
User.hasMany(Offer, {
  foreignKey: "user_id",
});

Offer.belongsTo(User, {
  foreignKey: "user_id",
});

// Book to Genre Associations 
Genre.hasMany(Book, {
  foreignKey: "genre_id",
});

Book.belongsTo(Genre, {
  foreignKey: "genre_id",
});

// User to Genre Associations
Genre.hasMany(User, {
  as: "favorite_genre",
  foreignKey: "favorite_genre_id",
});

User.belongsTo(Genre, {
  as: "favorite_genre",
  foreignKey: "favorite_genre_id",
});

// Book to Author Associations
Author.hasMany(Book, {
  foreignKey: "author_id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});

// Offer to Book Associations
Book.hasMany(Offer, {
  foreignKey: "book_id",
});

Offer.belongsTo(Book, {
  foreignKey: "book_id",
});

module.exports = {
  User,
  Genre,
  Author,
  Book,
  Offer,
};
