const { Author } = require("../models");

const authorData = [
  {
    first_name: "Sophia",
    last_name: "Card",
  },
  {
    first_name: "Malcolm",
    last_name: "Gladwell",
  },
  {
    first_name: "Jon",
    last_name: "Krakauer",
  },
  {
    first_name: "F. Scott",
    last_name: "Fitzgerald",
  },
  {
    first_name: "Rebecca",
    last_name: "Skloot",
  },
  {
    first_name: "J.D.",
    last_name: "Salinger",
  },
];

const seedAuthors = () => Author.bulkCreate(authorData);

module.exports = seedAuthors;
