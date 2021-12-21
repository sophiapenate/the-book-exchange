const router = require("express").Router();
const { Book, User, Author, Genre, Offer } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  Book.findAll({
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
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
        res
          .status(404)
          .json({ message: `No book found with id ${req.params.id}.` });
      } else {
        res.json(dbData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Book.create({
    title: req.body.title,
    author_id: req.body.author_id,
    genre_id: req.body.genre_id,
    is_paperback: req.body.is_paperback,
    condition: req.body.condition,
    description: req.body.description,
    is_available: req.body.is_available,
    user_id: req.session.user_id,
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Book.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData[0]) {
        res.status(404).json({ message: "No book found with this id." });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No book found with id ${req.params.id}.` });
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
