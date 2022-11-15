// 라우터처럼 기본적으로 있어야하는 것임
const Sequelize = require("sequelize");


// 기본적인 틀
module.exports = class User_Info extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 9가지 정보
            userImg: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(255),
            },
            userId: {
                type: Sequelize.STRING(255),
                unique: true
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
            money: {
                type: Sequelize.INTEGER,
                allowNull: true
            }

        }, {
            sequelize,
            modelName: "User_Info",
            tableName: "userInfo",
            timestamps: true,
            paranoid: true,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        });

    }
    static associate(db) {

        // 유저가 댓글들을 가짐 : 댓글에 유저 아이디를 추가해준다.
        db.User_Info.hasMany(db.ReviewInfo, {
            as: "UserReviews",      // 메서드명
            sourceKey: "userId",   // 위에서 userId를 불러오겠다
            foreignKey: "userId",   // 생성 컬럼 이름
        });



        // 유저와 책을 상호 연결시킴
        db.User_Info.belongsToMany(db.BookInfo, {
            through: "userbook",   // 생길 테이블 이름
            as: "UserInfo",        // 메서드명(addBookInfo)
            foreignKey: "userId",   // 생길 컬럼명
            // timestamps: true
            sourceKey: "userId",    // userId를 불러오겠다(위에서 unique설정 해줘야함)
            onDelete: "cascade",    // 삭제할때 양쪽에 꼭 필요함
        });
    }
}