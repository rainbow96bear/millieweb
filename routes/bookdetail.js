const router = require("express").Router();

const { User_Info, BookInfo, ReviewInfo } = require("../models/index.js");

const jwt = require("jsonwebtoken");


// 유저 아이디로 유저 이미지 구해오기
router.post("/getUserImg", async(req,res)=>{
  const userInfo = await User_Info.findOne({
    where : {userId : req.body.id}
  });
  const userImg = userInfo.dataValues.userImg;

  res.send({userImg : userImg});
});


// 리뷰 등록
router.post("/member_review", async (req, res) => {
  try {

    console.log(req.body);

    // 리뷰 
    // const temp = await ReviewInfo.create({
    //   review_content: req.body.review_content,
    //   // userId : userId
    // });

    // 해당 리뷰(리뷰내용)를 찾아옴
    // const review = await ReviewInfo.findOne({
    //   where : {review_content : req.body.review_content}
    // });
    // 찾아오는 것을 생성하는 것으로 바꿈 : 그래야 생성한 것을 넣어서 만들 수 있음
    const review = await ReviewInfo.create({
      review_content: req.body.review_content,
    });

    // 유저 아이디를 가져옴
    const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);
    console.log(userInfo.id);
    const userId = await User_Info.findOne({
      where: { userId: userInfo.id }
    });

    const bookTitle = await BookInfo.findOne({
      where: { title: req.body.bookTitle }
    });

    // 컬럼에 값을 집어넣음(리뷰에 userId와 bookTitle을..)
    userId.addUserReviews(review);
    bookTitle.addBookReviews(review);

    res.send({ status: 200 });

  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }

});


// 리뷰 정보 불러오기
router.post("/getReviews", async (req, res) => {
  // console.log(req.body.userId);
  console.log(req.body.bookTitle);

  const reviews = await ReviewInfo.findAll({
    where: { title: req.body.bookTitle },
    order: [['createdAt', 'DESC']]
  });
  // console.log(reviews[0].dataValues);
  // console.log(reviews[1].dataValues);

  res.send(reviews);
});


// 리뷰 삭제
router.post("/delete", async (req, res) => {

  try {
    // 현재 로그인된 유저를 가져와 넣어줌
    const userId = (jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET)).id;
    // console.log(userInfo.id);

    if (userId != req.body.userId) {
      res.send({ status: 400 });
      return;
    }

    console.log(req.body.id);

    const reviews = await ReviewInfo.destroy({
      where: {
        // id: req.body.id,
        title: req.body.bookTitle,
        userId: userId, // 댓글 삭제시 현재 유저 아이디와 해당 리뷰 아이디가 같아야함
        review_content: req.body.review_content,
      },
    });
    res.send({ status: 200, delCount: reviews });
  } catch (error) {
    res.send({ status: 401 });
  }

});



// 책 정보 불러오기
router.post("/load_book_info", async (req, res) => {

  console.log(req.body.title); // 책 제목

  const load_book_info = await BookInfo.findOne({
    where: { title: req.body.title }, // 책 제목이 같은 것을 갖아옴
    include: [{
      model: User_Info,
      as: "BookInfo",
      through: {
        attributes: ["userId"]
      }
    }]
  });


  console.log(load_book_info);
  res.send(load_book_info);

});


// moneyInfo
router.post("/priceInfo", async (req, res) => {
  // 쿠키 내용에서 이름을 가져옴
  const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);

  // DB에서 찾는다.(먼저 다대다 테이블 관계를 맺어준다.)
  // 아이디와 책을 각각 findOne해준다.
  const userId = await User_Info.findOne({
    where: { userId: userInfo.id } // 유저 아이디
  });
  const bookTitle = await BookInfo.findOne({
    where: { title: req.body.book } // 책 제목
  });

  const bookPrice = bookTitle.dataValues.price;
  const userMoney = userId.dataValues.money;

  res.send({ bookPrice: bookPrice, userMoney: userMoney });

});


// 내 서재에 담기
router.post("/addBook", async (req, res) => {

  try {
    // 쿠키 내용에서 이름을 가져옴
    const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);


    // DB에서 찾는다.(먼저 다대다 테이블 관계를 맺어준다.)
    // 아이디와 책을 각각 findOne해준다.
    const userId = await User_Info.findOne({
      where: { userId: userInfo.id } // 유저 아이디
    });
    const bookTitle = await BookInfo.findOne({
      where: { title: req.body.book } // 책 제목
    });

    // 유저이름과 북 인포가 같으면 이미 내 서재에 있다는 send를 해준다.


    if (req.body.money >= req.body.price) {
      // 해당 유저의 돈 정보를 업데이트 해준다.
      const userMoney = await User_Info.update({
        money: +req.body.money - +req.body.price,
      }, {
        where: { userId: userInfo.id } // 유저 아이디
        // 머니만 update : 내 money - book price
      });

      // 아래 놈 설명 : 컬럼에 값을 집어넣어줌.....
      // 이놈처럼 한방에 값을 넣으면 프라이머리키가 겹쳐서 안되고
      // 어떤 행위를 할 때마다 따로 이 것을 넣어줘야 한다고 한다.
      // ex) 유저가 책을 작성할 때 한 번, 유저가 책을 내 서재에 담을 때 한 번
      // bookTitle.addBookInfo(userId);
      // 생긴 테이블 이름 : userbook 
      userId.addUserInfo(bookTitle); // as의 이름임

      res.send({ status: 200 });
    } else {
      res.send({ status: 401 });
    }

  } catch (error) {
    res.send({ status: 400 });
  }

});





module.exports = router;
