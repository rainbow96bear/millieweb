const router = require("express").Router();

const join = require("./join.js");
const login = require("./login.js");
const category = require("./category.js");
const mainhome = require("./mainhome.js");
const bookAdd = require("./bookAdd.js");
const bookdetail = require("./bookdetail.js");

router.use("/boodAdd", bookAdd);
router.use("/join", join);
router.use("/login", login);
router.use("/category", category);
router.use("/mainhome", mainhome);
router.use("/bookdetail", bookdetail);

module.exports = router;
