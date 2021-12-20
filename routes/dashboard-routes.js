const { Genre, Author, User, Book } = require("../models");

const router = require("express").Router();

router.get("/", (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Book,
        include: [
          {
            model: Author,
            attributes: ["first_name", "last_name"],
          },
          {
            model: Genre,
            attributes: ["name"],
          },
        ],
      },
    ],
  })
  .then(dbData => {
    //serialize genreData
    const user = dbData.get({ plain: true });
    res.render("dashboard", { user, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
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
      res.render("add-book", { genres, loggedIn: req.session.loggedIn });
    });
  }
});

module.exports = router;
