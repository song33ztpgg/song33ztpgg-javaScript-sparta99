const express = require("express");
const { Posts } = require("../models");
const { Users } = require("../models");
const { Comments } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router(); 

//★댓글 생성
router.post("/posts/:postId/comment", authMiddleware, async(req,res) => { 
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;
 
    const commentData = await Comments.create({ 
        UserId : userId,
        PostId : postId,
        comment
    });
    
     return res.status(200).json({data : commentData});
});

//★댓글 조회
router.get("/posts/:postId/comment", authMiddleware, async(req,res) => { 
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const commentData = await Comments.findAll({
        attributes: ["commentId","userId", "postId", "comment","createdAt", "updatedAt"],
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    
     return res.status(200).json({comments : commentData});
});

//★수정
router.put("/posts/:postId/comment/:commentId", authMiddleware, async(req,res) => { 
    const { userId } = res.locals.user;
    const { postId ,commentId} = req.params;
    const { comment } = req.body;
    
    const updateComment = await Comments.update(
        { comment },
        { where: { PostId :postId, commentId } }
      );
    return res.send("확인");
});

//★삭제
router.delete("/posts/:postId/comment/:commentId", authMiddleware, async(req,res) => { 
    const { postId ,commentId} = req.params;
   console.log("삭제명령어");
    const commentData = await Comments.findOne({
        attributes: ["commentId","userId", "postId", "comment","createdAt", "updatedAt"],
        where: { commentId },
    });

    await Comments.destroy({
        where: { commentId},
      });

    return res.send("삭제확인");
});

module.exports = router;