// 라우터처럼 기본적으로 있어야하는 것임
const Sequelize = require("sequelize");


// 기본적인 틀
module.exports = class UserInfo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 8가지 정보
            userImg: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(255),
            },
            userId: {
                type: Sequelize.STRING(255),
                unique:true
            },
            email: {
                type: Sequelize.STRING(255),
            },
            userPw: {
                type: Sequelize.STRING(255),
            },
            birthday: {
                type: Sequelize.STRING(255),
            },
            nickname: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            publish: {
                type: Sequelize.STRING(255),
                allowNull: true
            },

        }, {
            sequelize,
            modelName: "UserInfo",
            tableName: "userInfo",
            timestamps: true,
            paranoid: true,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        });

    }
    static associate(db) {
        db.UserInfo.belongsToMany(db.BookInfo, {
            through: "userbook",   // 생길 테이블 이름
            as: "UserInfo",        // 메서드명(addBookInfo)
            foreignKey: "userId",   // 생길 컬럼명
            // timestamps: true
            sourceKey : "userId"    // userId를 불러오겠다(위에서 unique설정 해줘야함)
        });
    }
}