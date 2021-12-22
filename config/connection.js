const Sequelize = require("sequelize");

// import env variables
require("dotenv").config();

let sequelize;
// check if running remotely
if (process.env.JAWSDB_URL) {
  // TODO Remove later
  console.log(`process.env.JAWSDB_URL ${process.env.JAWSDB_URL}`);
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // create local db connection
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
