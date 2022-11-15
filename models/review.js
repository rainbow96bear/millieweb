const Sequelize = require("sequelize");
// const { associate } = require("./join");

module.exports = class ReviewInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        review_content: {
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        modelName: "ReviewInfo",
        tableName: "review_info",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: true,
        paranoid : true
      }
    );
  }
  associate(db) {
    // 댓글들을 책에 연결시켜줌
    db.ReviewInfo.belongsTo(db.BookInfo, {
      foreignKey: "title", // 생성 컬럼 이름
      targetKey: "title",
    });



    // 댓글들을 유저에 연결시켜줌
    db.ReviewInfo.belongsTo(db.User_Info, {
      foreignKey: "userId", // 생성 컬럼 이름
      targetKey: "userId",
    });


  }
};
