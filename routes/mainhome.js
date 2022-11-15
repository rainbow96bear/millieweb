const router = require("express").Router();

const jwt = require("jsonwebtoken");


router.post("/cookieInfo", (req, res) => {

    const cookieInfo = jwt.verify(req.body["cookieJwt"], process.env.COOKIE_SECRET);
    const userId = cookieInfo["id"];
    const userName = cookieInfo["name"];
    const userImg = cookieInfo["userImg"];
    const userMoney = cookieInfo["money"];

    // 만약 작가 회원이면
    if (cookieInfo["publish"]) {
        console.log(`user id : ${userId}, user name : ${userName}, 작가이름 : ${cookieInfo["nickname"]}, 출판사 : ${cookieInfo["publish"]}`);
        res.send({ id: userId, name: userName, userImg: userImg, nickname: cookieInfo["nickname"], publish: cookieInfo["publish"], status: 200 });
    } else if (userId) { // 일반 회원
        console.log(`user id : ${userId}, user name : ${userName}`);
        res.send({ id: userId, name: userName, userImg: userImg, money : userMoney, status: 201 });
    } else {
        res.send({ status: 400 });
    }

});


// 로그아웃시 쿠키삭제
router.post("/clearCookie", (req, res) => {

    res.clearCookie(req.body.cookieName);
    res.send({ status: 200 });

});


module.exports = router;
