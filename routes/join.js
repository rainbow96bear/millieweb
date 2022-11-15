const router = require("express").Router();

const crypto = require("crypto-js");

// 구조분해 할당으로 저 안에 있는 것의 User_Info만 가져온다.
// models에 만든 User_Info 클래스..
const {User_Info} = require("../models/index.js");


router.post("/idCheck", async (req, res)=>{
    try {

        if(await User_Info.findOne({where : {userId : req.body.userId}})){
            console.log("이미있음");
            res.send({status : 401});
        }else{
            console.log("DB에 중복되는 아이디 없음");
            res.send({status : 200});
        }
        
    } catch (error) {
        console.error(error);
    }
});




// 이미지 업로드(multer)
// cb : call back
const multer = require("multer");
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "./uploads");
    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage : storage});
// 그리고 아래 router.post의 2번째 인자에 upload.single을 추가해준다.
// 그리고 DB에 저장하는 부분에 req.file.originalname이라고 적어준다.




// 일반 회원가입
router.post("/signup", upload.single("userImg"), async (req, res)=>{

    try{
        console.log(req.body);
        // 로그인 아이디를 db에서 찾아서(findOne, findAll) 있으면 에러
        // DB에서 꺼내올 시간이 필요해 await사용
        if(await User_Info.findOne({where : {userId : req.body.userId}})){
            console.log("이미있음");
            res.send({status : 401});
        }else{
            await User_Info.create({
                // 컬럼이름 : 값,
                userImg : req.file.originalname,
                name : req.body.name,
                userId : req.body.userId,
                email : req.body.email,
                userPw : crypto.SHA256(req.body.userPw).toString(),
                birthday : req.body.birthday,
                nickname : null,
                publish : null,
                money : 100000,

            });
            console.log("하이");
            res.send({status : 200});
        }

    }catch(err){
        console.error(err);
        res.send({status : 400});
    }

    // 받은 정보 : req.body
    // req.body.id 등등...
    // 로그인 아이디를 db에서 찾아서(findOne, findAll) 있으면 에러
    // if()
    // 없으면 db에 넣음(create)
    // const userInfo = await 
});


// 작가 회원가입
router.post("/authorSignup", upload.single("userImg"), async (req, res)=>{

    try{
        console.log(req.body);
        // 로그인 아이디를 db에서 찾아서(findOne, findAll) 있으면 에러
        // DB에서 꺼내올 시간이 필요해 await사용
        if(await User_Info.findOne({where : {userId : req.body.userId}})){
            console.log("이미있음");
            res.send({status : 401});
        }else if(await User_Info.findOne({where : {nickname : req.body.nickname}})){
            res.send({status : 402});
        }else{
            await User_Info.create({
                // 컬럼이름 : 값,
                userImg : req.file.originalname,
                name : req.body.name,
                userId : req.body.userId,
                email : req.body.email,
                userPw : crypto.SHA256(req.body.userPw).toString(),
                birthday : req.body.birthday,
                nickname : req.body.nickname,
                publish : req.body.publish,
                money : 0,

            });
            console.log("하이");
            res.send({status : 200});
        }

    }catch(err){
        console.error(err);
    }
});

module.exports = router;