const router = require("express").Router();

const userRoutes = require("./user-routes");
const authorRoutes = require("./author-routes");

router.use("/users", userRoutes);
router.use("/authors", authorRoutes);

module.exports = router;