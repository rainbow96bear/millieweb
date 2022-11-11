const router = require("express").Router();

const { UserInfo, BookInfo, review } = require("../models/index.js");

const jwt = require("jsonwebtoken");


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

// 내 서재에 담기
router.post("/addBook", async(req, res)=>{

  // 책 제목
  console.log(req.body.book);

  // 쿠키 내용에서 이름을 가져옴
  console.log(req.cookies.millie_login);
  const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);
  
  // 유저 아이디
  console.log(userInfo.id);

  // DB에서 찾는다.(먼저 다대다 테이블 관계를 맺어준다.)
  // 아이디와 책을 각각 findOne해준다.
  const userId = await UserInfo.findOne({
    where : {userId : userInfo.id}
  });
  const bookTitle = await BookInfo.findOne({
    where : {title : req.body.book}
  });

  // 생긴 테이블 이름 : userbook
  
  console.log(userId, bookTitle);
  
  // 컬럼에 값을 집어넣어줌.....
  // 이놈처럼 한방에 값을 넣으면 프라이머리키가 겹쳐서 안되고
  // 어떤 행위를 할 때마다 따로 이 것을 넣어줘야 한다고 한다.
  // ex) 유저가 책을 작성할 때 한 번, 유저가 책을 내 서재에 담을 때 한 번..
  // bookTitle.addBookInfo(userId); 

  userId.addUserInfo(bookTitle);

});



module.exports = router;
