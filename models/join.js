// 라우터처럼 기본적으로 있어야하는 것임
const Sequelize = require("sequelize");


// 기본적인 틀
module.exports = class UserInfo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // 8가지 정보
            userImg : {
                type : Sequelize.STRING(255),
                allowNull : true
            },
            name : {
                type : Sequelize.STRING(255),
            },
            userId : {
                type : Sequelize.STRING(255),
            },
            email : {
                type : Sequelize.STRING(255),
            },
            userPw : {
                type : Sequelize.STRING(255),
            },
            birthday : {
                type : Sequelize.STRING(255),
            },
            nickname : {
                type : Sequelize.STRING(255),
                allowNull : true
            },
            publish : {
                type : Sequelize.STRING(255),
                allowNull : true
            },

        },{
            sequelize,
            modelName : "UserInfo",
            tableName : "userInfo",
            timestamps : true,
            paranoid : true,
            charset : "utf8mb4",
            collate : "utf8mb4_general_ci"
        });

    }
}