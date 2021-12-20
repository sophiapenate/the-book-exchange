const router = require("express").Router();
const { Offer, Book, User, Author, Genre } = require("../../models");

router.get("/", (req, res) => {
  Offer.findAll()
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Offer.findOne({
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
          .json({ message: `No offer found with id ${req.params.id}.` });
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
  Offer.create({
    offer_text: req.body.offer_text,
    book_id: req.body.book_id,
    user_id: req.session.user_id
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Offer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: `No offer found with id ${req.params.id}.` });
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
