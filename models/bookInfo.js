const Sequelize = require("sequelize");

module.exports = class BookInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({}, {});
  }
};
