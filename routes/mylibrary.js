const router = require("express").Router();

const { User_Info, BookInfo } = require("../models/index.js");


router.post("/getBooks", async(req, res)=>{
    console.log(req.body.userId);
    const userId = req.body.userId;

    const books = await User_Info.findOne({
        where : {userId : userId},
        include : [{
            model : BookInfo,
            as : "UserInfo",
            through : {
                attributes : ["bookTitle"]
            }
        }]
    });

    
    res.send(books);

});


module.exports = router;
