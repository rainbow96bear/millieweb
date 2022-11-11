const router = require("express").Router();

const { User_Info, BookInfo, ReviewInfo } = require("../models/index.js");

const jwt = require("jsonwebtoken");


// 리뷰 등록
router.post("/member_review", async (req, res) => {
  try {

    console.log(req.body);
    
    // 리뷰 
    await ReviewInfo.create({
      review_content: req.body.review_content,
      // userId : userId
    });

    // 해당 리뷰(리뷰내용)를 찾아옴
    const review = await ReviewInfo.findOne({
      where : {review_content : req.body.review_content}
    });

    // 유저 아이디를 가져옴
    const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);
    console.log(userInfo.id);
    const userId = await User_Info.findOne({
      where : {userId : userInfo.id}
    });

    // 컬럼에 값을 집어넣음(리뷰에 userId를..)
    userId.addUserReviews(review);
    res.send({ status: 200 });

  } catch (err) {
    console.error(err);
    res.send({status : 400});
  }

});


// 리뷰 정보 불러오기
router.post("/getReviews", async (req, res)=>{
  console.log(req.body.userId);

  const reviews = await ReviewInfo.findAll();
  // console.log(reviews[0].dataValues);
  // console.log(reviews[1].dataValues);

  res.send(reviews);
});


// 책 정보 불러오기
router.post("/load_book_info", async (req, res) => {

  console.log(req.body.title); // 책 제목

  const load_book_info = await BookInfo.findOne({
    where: { title: req.body.title }, // 책 제목이 같은 것을 갖아옴
    include : [{
      model : User_Info,
      as : "BookInfo",
      through : {
        attributes : ["userId"]
      }
    }]
  });
  

  console.log(load_book_info);
  res.send(load_book_info);

});

// 내 서재에 담기
router.post("/addBook", async(req, res)=>{

  // 쿠키 내용에서 이름을 가져옴
  const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);

  // DB에서 찾는다.(먼저 다대다 테이블 관계를 맺어준다.)
  // 아이디와 책을 각각 findOne해준다.
  const userId = await User_Info.findOne({
    where : {userId : userInfo.id} // 유저 아이디
  });
  const bookTitle = await BookInfo.findOne({
    where : {title : req.body.book} // 책 제목
  });

  // 생긴 테이블 이름 : userbook
  console.log(userId, bookTitle);
  
  // 컬럼에 값을 집어넣어줌.....
  // 이놈처럼 한방에 값을 넣으면 프라이머리키가 겹쳐서 안되고
  // 어떤 행위를 할 때마다 따로 이 것을 넣어줘야 한다고 한다.
  // ex) 유저가 책을 작성할 때 한 번, 유저가 책을 내 서재에 담을 때 한 번
  // bookTitle.addBookInfo(userId); 
  userId.addUserInfo(bookTitle); // as의 이름임

  res.send({status : 200});

});



module.exports = router;
