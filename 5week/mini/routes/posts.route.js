const express = require("express");
const { Posts } = require("../models");
const router = express.Router();

//★ 게시글 생성
router.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body; //body에서 입력한  title,content를 가져온다

    const post = await Posts.create({
      title,
      content,
    });

    return res.status(201).json({ 확인용: post }); 
    return res.status(201).json("게시글이 생성되었습니다"); 
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ errorMessage: "게시글 생성에 실패하였습니다" });
  }
});

// ★게시글 목록 조회
router.get("/posts", async (req, res) => {
  
  let posts = await Posts.findAll({
    attributes: ["post_id", "title", "content"],
  });


  //제배열
  // let transformedPosts = posts.map(post => ({
  //   postId: post.postId,
  //   title: post.title,
  //   userId: post.userId,
  //   createdAt: post.createdAt,
  //   updatedAt: post.updatedAt,
  //   nickname: post.User.nickname
  // }));

  return res.status(200).json({ data: posts });
});

module.exports = router;
