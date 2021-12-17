const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll();
});

router.get("/:id", (req, res) => {
  User.findOne();
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    favorite_genre_id: req.body.favorite_genre_id,
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
