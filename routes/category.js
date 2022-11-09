const router = require("express").Router();

const fs = require("fs");
const { BookInfo } = require("../models/index.js");

const category = [
  "경제경영",
  "novel",
  "에세이",
  "자기 계발",
  "IT",
  "외국어",
  "라이프스타일",
  "인문",
  "철학",
  "사회",
  "과학",
  "역사",
  "여행",
  "종교",
  "판타지,무협",
  "로맨스 BL",
];

router.post("/booklist/bookAdd", async (req, res) => {
  const book_info = await BookInfo.findAll();
  console.log(book_info);
  res.send(book_info);
});

router.post("/booklist/test", async (req, res) => {
  const booklist = JSON.parse(fs.readFileSync("books.json", "utf-8"));
  switch (req.body.category) {
    case "경제경영":
      res.send(booklist.economic_management);
      break;
    case "소설":
      res.send(booklist.novel);
      break;
    case "에세이":
      res.send(booklist.essay);
      break;
    case "자기 계발":
      res.send(booklist.self_development);
      break;
    case "IT":
      res.send(booklist.it);
      break;
    case "외국어":
      res.send(booklist.foreign_language);
      break;
    case "라이프스타일":
      res.send(booklist.life_style);
      break;
    case "인문":
      res.send(booklist.humanities);
      break;
    case "철학":
      res.send(booklist.philosophy);
      break;
    case "사회":
      res.send(booklist.social);
      break;
    case "과학":
      res.send(booklist.science);
      break;
    case "역사":
      res.send(booklist.history);
      break;
    case "여행":
      res.send(booklist.novel);
      break;
    case "종교":
      res.send(booklist.novel);
      break;
    case "판타지.무협":
      res.send(booklist.novel);
      break;
    case "로맨스 BL":
      res.send(booklist.novel);
      break;
  }
});
module.exports = router;
