const router = require("express").Router();
const { Genre, Book, Author } = require("../models");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  let search_results = []

  // search books
  const book_search = await Book.findAll({
    where: {
      [Op.or]: [
        {title: { [Op.substring]: `%${req.query.q}%` }},
        {description: { [Op.substring]: `%${req.query.q}%` }},
      ]
    }
  });

  // serialize each search result
  const book_search_results = book_search.map((book) => book.get({ plain: true }));

  // add each search result to search results array
  search_results = search_results.concat(book_search_results);

  console.log(search_results);





  
    // .then(booksData => {
    //   //serialize genreData
    //   const books = booksData.map((book) => book.get({ plain: true }));
    //   search_results = search_results.concat(books);
    //   console.log(search_results);
    //   // render signup page and send genres for favorite genre dropdown
    //   res.render("search-results", { books, query: req.query.q });
    // });

  // expects query string property q=searched_term
  // EX: /search?q=catcher+in+the+rye
  res.render("search-results", { query: req.query.q });
});

router.get("/book/:id", (req, res) => {
  res.render("single-book");
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
