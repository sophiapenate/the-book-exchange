const sequelize = require('../config/connection');

const seedAuthors = require('./authorData');
const seedGenres = require('./genreData');

const seedAll = async () => {
 await sequelize.sync({ force: true });

 await seedAuthors();
 await seedGenres();

 process.exit(0);
};

seedAll();