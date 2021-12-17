const router = require("express").Router();

const userRoutes = require("./user-routes");
const authorRoutes = require("./author-routes");
const genreRoutes = require("./genre-routes");
const bookRoutes = require("./book-routes");

router.use("/users", userRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/books", bookRoutes);

module.exports = router;