const router = require("express").Router();

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

module.exports = router;
