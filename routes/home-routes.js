const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/search", (req, res) => {
  // expects query string property q=searched_term
  // EX: /search?catcher+in+the+rye
  res.render("search-results", { query: req.query.q } );
});

router.get("/book/:id", (req, res) => {
  res.render("single-book");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
