const { Genre, Author, User, Book, Offer } = require("../models");

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
          {
            model: Offer,
            include: [
              {
                model: User,
                attributes: ["first_name", "email", "phone"],
              }
            ]
          }
        ],
      },
    ],
  })
    .then((dbData) => {
      //serialize genreData
      const user = dbData.get({ plain: true });

      // pass in property to indicate all books belong to user
      user.books.forEach((book) => (book.belongs_to_user = true));

      // get array of users traded books
      const traded_books = [];
      user.books.forEach((book) => {
        if (!book.is_available) {
          traded_books.push(book);
        }
      });

      console.log(traded_books);

      // render dashboard and send data
      res.render("dashboard", {
        user,
        traded_books,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
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
