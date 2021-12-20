const router = require("express").Router();
const { Genre, Book, Author, User, Offer } = require("../models");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  Book.findAll({
    limit: 10,
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Author,
        attributes: ["first_name", "last_name"],
      },
      {
        model: Genre,
        attributes: ["name"],
      },
    ],
  })
    .then((dbData) => {
      const books = dbData.map((book) => book.get({ plain: true }));
      res.render("homepage", { books, loggedIn: req.session.loggedIn });
    })
    .catch();
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  const queryArr = query.split(" ");

  try {
    // search authors
    const authorSearchResult = await Author.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.in]: queryArr } },
          { last_name: { [Op.in]: queryArr } },
          { first_name: { [Op.like]: `%${query}%` } },
          { last_name: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // serialize author search data and get author ids
    const authorIdsArr = authorSearchResult.map(
      (author) => author.get({ plain: true }).id
    );

    // search genres
    const genreSearchResult = await Genre.findAll({
      where: {
        [Op.or]: [
          //{ name: { [Op.in]: queryArr } },
          { name: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // serialize genre search data and get genre ids
    const genreIdsArr = genreSearchResult.map(
      (genre) => genre.get({ plain: true }).id
    );

    // search books
    const bookSearchResult = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { author_id: { [Op.in]: authorIdsArr } },
          { genre_id: { [Op.in]: genreIdsArr } },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Author,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Genre,
          attributes: ["name"],
        },
      ],
    });

    // serialize each search result
    const books = bookSearchResult.map((book) => book.get({ plain: true }));

    // render search results view with found books
    res.render("search-results", {
      query,
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/book/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
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
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).render("404");
        return;
      }

      const book = dbData.get({ plain: true });

      res.render("single-book", { book, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    Genre.findAll({
      order: [["name", "ASC"]],
    }).then((genreData) => {
      //serialize genreData
      const genres = genreData.map((genre) => genre.get({ plain: true }));
      // render signup page and send genres for favorite genre dropdown
      res.render("signup", { genres });
    });
  }
});

module.exports = router;
