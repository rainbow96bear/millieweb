const Sequelize = require("sequelize");

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
<<<<<<< HEAD
        modelName: "ReviewInfo",
=======
        modelName: "review_info",
>>>>>>> 346a3280546795c0c252a4717e9343fd9480f03c
        tableName: "review_info",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: true,
      }
    );
  }
};
