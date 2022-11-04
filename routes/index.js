const router = require("express").Router();

const category = require("./category.js");
const afterMain = require("./afterMain.js");

router.use("/category", category);
router.use("/afterMain", afterMain);

module.exports = router;
