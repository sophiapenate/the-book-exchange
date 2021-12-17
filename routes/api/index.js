const router = require("express").Router();

const userRoutes = require("./user-routes");
const authorRoutes = require("./author-routes");
const genreRoutes = require("./genre-routes");

router.use("/users", userRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);

module.exports = router;