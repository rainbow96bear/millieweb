const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { BookInfo, review, UserInfo } = require("../models/index.js");

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

router.post("/mybook", async (req, res) => {
  const tempUserInfo = jwt.verify(
    req.cookies.millie_login,
    process.env.COOKIE_SECRET
  );

  console.log(tempUserInfo);
  const temp_user_Info = await UserInfo.findOne({
    where: { userId: tempUserInfo.id },
  });
  const temp_book_Info = await BookInfo.findOne({
    where: { title: req.body.book_title },
  });
  console.log(temp_user_Info);
  console.log(temp_book_Info);
});

module.exports = router;
