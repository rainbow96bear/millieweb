const router = require("express").Router();

const join = require("./join.js");
const login = require("./login.js");
const category = require("./category.js");

router.use("/join", join);
router.use("/login", login);
router.use("/category", category);

module.exports = router;
