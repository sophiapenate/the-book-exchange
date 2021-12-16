const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
    User.findAll();
});

module.exports = router;