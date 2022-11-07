const router = require("express").Router();

const join = require("./join.js");
const login = require("./login.js");


router.use("/join", join);
router.use("/login", login);

module.exports = router;
