const Sequelize = require("sequelize");

module.exports = class BookInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        book_img: {
          type: Sequelize.STRING(255),
        },
        title: {
          type: Sequelize.STRING(255),
          unique: true
        },
        title_sub: {
          type: Sequelize.STRING(255),
        },
        introduce: {
          type: Sequelize.STRING(255),
        },
        category: {
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        modelName: "Book_info",
        tableName: "book_info",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: true,
      }
    );
  }
  static associate(db) {
    // 책이 댓글들을 가짐 : 댓글에 책 제목을 추가해준다.
    db.BookInfo.hasMany(db.ReviewInfo, {
      as: "BookReviews",      // 메서드명
      sourceKey: "title",   // 위에서 title을 불러오겠다
      foreignKey: "title",   // 생성 컬럼 이름
    });



    // 책과 유저를 상호 연결시킴
    db.BookInfo.belongsToMany(db.User_Info, {
      through: "userbook",     // 생길 테이블 이름
      as: "BookInfo",          // 사용할 메서드명(addBookInfo), 어디서 사용? : 
      foreignKey: "bookTitle", // 생길 컬럼명
      sourceKey: "title"         // title과 그의 속성을 그대로 가져와 사용함
      // timestamps : true
    });
  }
};
