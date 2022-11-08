const router = require("express").Router();

const multer = require("multer");

const { BookInfo } = require("../models/index.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("book_img"), async (req, res) => {
  try {
    await BookInfo.create({
      book_img: req.file.originalname,
      title: req.body.title,
      title_sub: req.body.title_sub,
      introduce: req.body.introduce,
      category: req.body.category,
      publisher: req.body.publisher,
    });
    res.send({ status: "생성" });
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

module.exports = router;
