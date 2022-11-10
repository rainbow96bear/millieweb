const router = require("express").Router();

const { BookInfo, review } = require("../models/index.js");

router.post("/member_review", async (req, res) => {
  try {
    await review.create({
      review_content: req.body.review_content,
    });
    res.send({ status: "성공?" });
  } catch (err) {
    console.error(err);
  }
});

router.post("/load_book_info", async (req, res) => {
  console.log(req.body.title);
  const load_book_info = await BookInfo.findOne({
    where: { title: req.body.title },
  });
  console.log(load_book_info);
  res.send(load_book_info);
});

module.exports = router;
