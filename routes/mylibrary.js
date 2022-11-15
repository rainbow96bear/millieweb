const router = require("express").Router();

const { User_Info, BookInfo } = require("../models/index.js");

const jwt = require("jsonwebtoken");


router.post("/getUserMoney", async(req,res)=>{
    const userMoney = (await User_Info.findAll({ attributes: ["money"], where: { userId: req.body.id } }))[0].dataValues.money;
    res.send({money : userMoney});
});


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

        const load_book_info = await BookInfo.findOne({
            where: { title: req.body.title }, // 책 제목이 같은 아이디를 갖아옴
            include: [{
                model: User_Info,
                as: "BookInfo",
                through: {
                    attributes: ["userId"]
                }
            }]
        });
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log(load_book_info);
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
        console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");

        // 만약 닉네임이 있는 유저(나중에 닉네임이 해당책 작가명과 같은 놈으로 바꾸기)(여기, 중요)
        if (nickname!=null) {

            // bookinfo의 제목의 작가와 같은 닉네임인지 확인한뒤 맞으면 삭제
            // const book = (await BookInfo.findAll({
            //     attributes: ["nickname"],
            //     where: { title: bookTitle }
            // }));

            BookInfo.destroy({ where: { title: bookTitle } });


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
