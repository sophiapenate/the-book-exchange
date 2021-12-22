const router = require("express").Router();
const { User, Book, Author, Genre } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Genre,
        as: "favorite_genre",
        attributes: ["name"],
      },
    ],
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
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
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No user found with id ${req.params.id}.` });
      } else {
        res.json(dbData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then((dbData) => {
      req.session.save(() => {
        req.session.user_id = dbData.id;
        req.session.username = dbData.username;
        req.session.loggedIn = true;
        res.json(dbData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbData) => {
    if (!dbData) {
      res.status(404).json({ message: "Username not found!" });
      return;
    }

    const validPw = dbData.checkPw(req.body.password);
    if (!validPw) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.loggedIn = true;
      res.json({ user: dbData, message: "You are now logged in!"});
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No user found with id ${req.params.id}.` });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
