const router = require("express").Router();

const { User_Info } = require("../models/index.js");

const crypto = require("crypto-js");

const jwt = require("jsonwebtoken");

router.post("/user", async (req, res) => {
    try {
        // 아이디 DB에 있음
        if (await User_Info.findOne({ where: { userId: req.body.id } })) {

            // 만약 출판사가 있으면 작가 회원이므로 리턴
            if (!((await User_Info.findAll({ attributes: ["publish"], where: { userId: req.body.id } }))[0].dataValues.publish == null)) {
                res.send({ status: 401 });
                return;
            }

            // 유저 이름
            const name = (await User_Info.findAll({ attributes: ["name"], where: { userId: req.body.id } }))[0].dataValues.name;
            // 유저 이미지
            const userImg = (await User_Info.findAll({ attributes: ["userImg"], where: { userId: req.body.id } }))[0].dataValues.userImg;
            // 유저 머니
            const userMoney = (await User_Info.findAll({ attributes: ["money"], where: { userId: req.body.id } }))[0].dataValues.money;

            // 해당 아이디에 비밀번호가 같음
            if (await User_Info.findOne({ where: { userId: req.body.id, userPw: crypto.SHA256(req.body.pw).toString() } })) {
                // 기존 쿠키를 삭제해준다.
                res.clearCookie("millie_login");
                // 쿠키에 jwt를 30분간 추가해 준다.
                res.cookie(
                    "millie_login",
                    jwt.sign({ id: req.body.id, name: name, userImg : userImg, money : userMoney}, process.env.COOKIE_SECRET),
                    { expires: new Date(Date.now() + 60000 * 30) }
                );
                res.send({ status: 200 }); // 로그인 완료.
            } else {
                res.send({ status: 402 }); // 비밀번호가 일치하지 않습니다.
            }
        } else {
            res.send({ status: 401 }); // 없는 아이디입니다.
        }
    } catch (err) {
        console.error(err);
        res.send({ status: 400 });
    }
});


// 작가회원 로그인
router.post("/author", async (req, res) => {
    try {
        if (await User_Info.findOne({ where: { userId: req.body.id } })) {
            if ((await User_Info.findAll({ attributes: ["publish"], where: { userId: req.body.id } }))[0].dataValues.publish == null) {
                res.send({ status: 401 });
                return;
            }

            // 유저 이름
            const name = (await User_Info.findAll({ attributes: ["name"], where: { userId: req.body.id } }))[0].dataValues.name;
            // 유저 이미지
            const userImg = (await User_Info.findAll({ attributes: ["userImg"], where: { userId: req.body.id } }))[0].dataValues.userImg;
            // 작가명, 출판사
            const nickname = (await User_Info.findAll({ attributes: ["nickname"], where: { userId: req.body.id } }))[0].dataValues.nickname;
            const publish = (await User_Info.findAll({ attributes: ["publish"], where: { userId: req.body.id } }))[0].dataValues.publish;

            if (await User_Info.findOne({ where: { userId: req.body.id, userPw: crypto.SHA256(req.body.pw).toString() } })) {
                res.clearCookie("millie_login");
                res.cookie(
                    "millie_login",
                    jwt.sign({ id: req.body.id, name : name, nickname : nickname, publish : publish, userImg : userImg }, process.env.COOKIE_SECRET),
                    { expires: new Date(Date.now() + 60000 * 30) }
                );
                res.send({ status: 200 });
            } else {
                res.send({ status: 402 });
            }
        } else {
            res.send({ status: 401 });
        }
    } catch (err) {
        console.error(err);
        res.send({ status: 400 });
    }

});




module.exports = router;
