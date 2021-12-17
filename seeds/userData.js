const { User } = require("../models");

const userData = [
  {
    first_name: "Sophia",
    last_name: "Barrett",
    email: "sophia@books.com",
    phone: "123-456-7890",
    favorite_genre_id: 1,
    username: 'sophia',
    password: 'password1234',
  },
  {
    first_name: "Gabriel",
    last_name: "Penate",
    email: "gabe@books.com",
    phone: "123-456-7890",
    favorite_genre_id: 6,
    username: 'gabe',
    password: 'password1234',
  },
  {
    first_name: "Catrick",
    last_name: "Swayze",
    email: "catrick@books.com",
    phone: "123-456-7890",
    favorite_genre_id: 11,
    username: 'catrick',
    password: 'password1234',
  },
  {
    first_name: "Kity",
    last_name: "Perry",
    email: "kity@books.com",
    phone: "123-456-7890",
    favorite_genre_id: 7,
    username: 'kity',
    password: 'password1234',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
