'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      /*
      다른 파일과의 연관관계를 다루는 부분이나 현재 과제에서는 
      사용하지 않으므로 아무것도 선언이 되어있지 않다
      */
    }
  }
  Posts.init({
    id: {
      allowNull: false,            // null값을 허용하지 않는다
      autoIncrement: true,         // 생성될때마다 자동적으로 1식 증가하여 부여해준다
      primaryKey: true,            // 기본키값 설정
      type: DataTypes.INTEGER,    //자료형은 int다
    },
    title: {
      allowNull: false,          // null값을 허용하지 않는다
      type: DataTypes.STRING,   //자료형은 String이다
    },
    content: {
      allowNull: false,          // null값을 허용하지 않는다
      type: DataTypes.STRING,   //자료형은 String이다
    }
    // ,
    // createdAt: {                //★ 만든날짜와 업데이트 날짜를 지우면 오류가 나서 남겨놓았다
    //   type: DataTypes.DATE      //아마도 default 값으로 선언되어 있지 않을까 추측한다
    // },
    // updatedAt: {
    //   type: DataTypes.DATE
    // }
  }, {
    sequelize,
    modelName: 'Posts',         //require할때 불러올 이름
  });
  return Posts;
};