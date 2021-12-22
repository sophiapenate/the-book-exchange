const { Genre } = require("../models");

const genreData = [
  {
    name: "Fiction",
  },
  {
    name: "Science Fiction",
  },
  {
    name: "Historical Fiction",
  },
  {
    name: "Fantasy",
  },
  {
    name: "Mystery",
  },
  {
    name: "Romance",
  },
  {
    name: "Thriller",
  },
  {
    name: "Horror",
  },
  {
    name: "Young Adult",
  },
  {
    name: "Non-Fiction",
  },
  {
    name: "Biography, Autobiography & Memoir",
  },
  {
    name: "Self-Help",
  },
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
