const router = require("express").Router();

const { User_Info, BookInfo } = require("../models/index.js");

const jwt = require("jsonwebtoken");

router.post("/getBooks", async (req, res) => {
    console.log(req.body.userId);
    const userId = req.body.userId;

    const books = await User_Info.findOne({
        where: { userId: userId },
        include: [{
            model: BookInfo,
            as: "UserInfo",
            through: {
                attributes: ["bookTitle"]
            }
        }]
    });

    res.send(books);
});

router.post("/deleteBook", async (req, res) => {
    try {
        const bookTitle = req.body.title;
        const nickname = req.body.nickname;

        // 만약 닉네임이 있는 유저(나중에 닉네임이 해당책 작가명과 같은 놈으로 바꾸기)
        if (nickname) {
            // // 모든것을 삭제해버리는 무시무시한 코드
            // try {
            //     const bookTitle = req.body.title;
            //     BookInfo.destroy({ where: { title: bookTitle } });
            //     res.send({ status: 200 });
            // } catch (error) {
            //     console.error(error);
            //     res.send({ status: 402 });
            // }

            // 관계 테이블에서 해당 유저의 책 삭제
            const book = await BookInfo.findOne({
                where: { title: bookTitle }
            });
            const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);
            const user = await User_Info.findOne({
                where: { userId: userInfo.id }
            });
            book.removeBookInfo(user);


            res.send({ status: 200 });
        } else {
            // 관계 테이블에서 해당 유저의 책 삭제
            const book = await BookInfo.findOne({
                where: { title: bookTitle }
            });
            const userInfo = jwt.verify(req.cookies.millie_login, process.env.COOKIE_SECRET);
            const user = await User_Info.findOne({
                where: { userId: userInfo.id }
            });

            book.removeBookInfo(user);
            res.send({ status: 202 });
        }

    } catch (error) {
        console.error(error);
        res.send({ status: 400 });
    }
});





module.exports = router;
