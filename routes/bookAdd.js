const router = require("express").Router();

const multer = require("multer");

const jwt = require("jsonwebtoken");

const { BookInfo, User_Info } = require("../models/index.js");

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
      // publisher: req.body.publisher,
      price: req.body.price,
    });

    // 왜 db 컬럼에 값이 안 들어가는지 알아내서 해결..
    // 책 추가 임시..(컬럼에 값을 집어넣어 줌)
    // title은 req.body.title하면 될듯
    const bookTitle = await BookInfo.findOne({
      where : {title : req.body.title}
    });
    // 쿠키에서 아이디를 가져옴
    const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);
    const userId = await User_Info.findOne({
      where : {userId : userInfo.id}
    });
    bookTitle.addBookInfo(userId); // 컬럼에 값을 집어넣음

    res.send({ status: 200 });
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

module.exports = router;
