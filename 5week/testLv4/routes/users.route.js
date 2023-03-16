const express = require("express");
const { Users } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken")

// ★회원가입
router.post("/users", async (req, res) => {
  try { 
    const { nickname, password } = req.body;
    const isExistUser = await Users.findOne({ where: { nickname } });
  
    if (isExistUser) {
      return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
    }
  
    // Users 테이블에 사용자를 추가합니다.
   await Users.create({ nickname, password });

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch(err) { 
    console.log(err);
    return res.status(400).json({errorMessage: '회원가입에 실패하였습니다.',})
  }
});


//★ 로그인
router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;
    const user = await Users.findOne({ where: { nickname } });

    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 닉네임입니다." });
    } else if (user.password != password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    //jwt 생성
    const token = jwt.sign({userId: user.userId}, "secret_key");

    //쿠키발급
    res.cookie("authorization", `Bearer ${token}`);

    return res.status(200).json({ message: "로그인 성공" });
  });

module.exports = router;