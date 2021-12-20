const { Genre } = require("../models");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/add-book", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
  } else {
    Genre.findAll({
      order: [["name", "ASC"]],
    }).then((genreData) => {
      //serialize genreData
      const genres = genreData.map((genre) => genre.get({ plain: true }));
      // render signup page and send genres for favorite genre dropdown
      res.render("add-book", { genres });
    });
  }
});

module.exports = router;
