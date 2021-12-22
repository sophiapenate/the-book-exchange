const sequelize = require('../config/connection');

const seedAuthors = require('./authorData');
const seedGenres = require('./genreData');
const seedUsers = require('./userData');
const seedBooks = require('./bookData');

const seedAll = async () => {
 await sequelize.sync({ force: true });

 await seedAuthors();
 await seedGenres();
 await seedUsers();
 await seedBooks();

 process.exit(0);
};

seedAll();