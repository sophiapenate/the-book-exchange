const router = require("express").Router();
const { Author, Book, User, Genre } = require("../../models");

router.get("/", (req, res) => {
  Author.findAll({
    order: [["last_name", "ASC"]],
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/search", (req, res) => {
  Author.findAll({
    where: {
      first_name: req.query.first_name,
      last_name: req.query.last_name,
    }
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
  Author.findOne({
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
          .json({ message: `No author found with id ${req.params.id}.` });
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
  Author.create(req.body)
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Author.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No author found with id ${req.params.id}.` });
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
