const Sequelize = require("sequelize");

module.exports = class BookInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(255),
        },
        sub_title: {
          type: Sequelize.STRING(255),
        },
        book_intro: {
          type: Sequelize.STRING(255),
        },
        category: {
          type: Sequelize.STRING(255),
        },
        publisher: {
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        modelName: "",
        tableName: "",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
