const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/add-book", (req, res) => {
  res.render("add-book");
});

module.exports = router;
