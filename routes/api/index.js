const router = require("express").Router();

const userRoutes = require("./user-routes");
const authorRoutes = require("./author-routes");
const genreRoutes = require("./genre-routes");
const bookRoutes = require("./book-routes");
const offerRoutes = require("./offer-routes");

router.use("/users", userRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/books", bookRoutes);
router.use("/offers", offerRoutes);

module.exports = router;