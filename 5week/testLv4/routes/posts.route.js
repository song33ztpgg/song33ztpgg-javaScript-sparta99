const express = require("express");
const { Posts, Users } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

//★ 게시글 생성
router.post("/posts", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user; //게시글 생성자 정보를 가져온다
    const { title, content } = req.body; //body에서 입력한  title,content를 가져온다

    const post = await Posts.create({
      //게시글 생성
      UserId: userId, //게시글작성자의 userId 정보를 넣는다
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
    attributes: ["postId", "title", "userId", "createdAt", "updatedAt"],
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });


  //제배열
  let transformedPosts = posts.map(post => ({
    postId: post.postId,
    title: post.title,
    userId: post.userId,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    nickname: post.User.nickname
  }));

  return res.status(200).json({ data: transformedPosts });
});

//★ 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  
  const post = await Posts.findOne({
    attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

//★ 게시글 수정
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const { title, content } = req.body;

  const updateCount = await Posts.update(
    { title, content },
    { where: { postId, UserId: userId } }
  );

  return res.status(200).json({ data: updateCount });
});

//★게시글 삭제
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ["postId","UserId", "title", "content", "createdAt", "updatedAt"],
    where: { postId },
  });

  await Posts.destroy({
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

module.exports = router;
