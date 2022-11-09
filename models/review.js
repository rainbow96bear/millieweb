const Sequelize = require("sequelize");

module.exports = class review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        review_content: {
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        modelName: "Newtest",
        tableName: "newtest",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: true,
      }
    );
  }
};
