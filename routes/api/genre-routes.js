const router = require("express").Router();
const { Genre, Book, Author, User } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  Genre.findAll({
    order: [["name", "ASC"]],
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
  Genre.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Book,
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Author,
            attributes: ["first_name", "last_name"],
          },
        ],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No genre found with id ${req.params.id}.` });
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
  Genre.create(req.body)
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Genre.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No genre found with id ${req.params.id}.` });
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
