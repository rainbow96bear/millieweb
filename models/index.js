"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const UserInfo = require("./join.js"); // module.exports 를 해줘야함
const BookInfo = require("./bookInfo.js");
const review = require("./review.js");

// const Login = require("./login.js"); // 파일 만들기

const db = { UserInfo, BookInfo, review };
// const db = {UserInfo, Login};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

UserInfo.init(sequelize);
BookInfo.init(sequelize);
// Login.init(sequelize);
review.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
