const express = require("express");
const { Posts, Users, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const { Op, sequelize } = require('sequelize');

//★ 좋아요 확인
router.get("/like", authMiddleware, async (req, res) => {
  try {

    const { userId } = res.locals.user;

    console.log("post를 정의한다");
    let posts = await Posts.findAll({
      attributes: ["postId", "title", "userId", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
        {
          model: Likes,
          attributes: ["LikeId"],
        },
      ],
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

   console.log(posts.Likes);

    let transformedPosts = posts.map((value) => ({
      postId: value.postId,
      title: value.title,
      userId: value.userId,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      // nickname: value.User.nickname,
      nickname: value.User.nickname,
      // LikeId: value.Like.LikeId,
    }));

    return res.status(200).json({ data: transformedPosts });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "좋아요 게시글 조회에 실패하였습니다.",
    });
  }
});

//★ 좋아요 추가
router.put("/:postId/like", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    console.log(postId); 
    console.log(userId); 
 
    const post = await Posts.findOne({
      where: { postId },
    });

    console.log("★ postID있는지 확인 ");
    if (!post) {
      return res.status(404).json({
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }

    console.log("★ Like에서 postid가 존재했었는지");
    let likeData = await Likes.findOne({
      where: { PostId: postId, UserId : userId},
    });
    console.log("likeData 결과는" );
    console.log(likeData);

    if (!likeData) {
      await Likes.create({
        PostId: postId,
        UserId: userId
      });
      return res.send("좋아요 생성");
     } else {
      await Likes.destroy({
        where: { PostId: postId },
      });
      return res.send("좋아요 삭제");
    }
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      errorMessage: "게시글 좋아요에 실패하였습니다.",
    });
  }
});


/*
// 좋아요 게시글 조회
router.get('/like', authMiddleware, async (req, res) => {
  // try {
    const { userId } = res.locals.user;


    const parseLikePostsModel = (likes) => {
      return likes.map((like) => {
        let obj = {};

        for (const [k, v] of Object.entries(like)) {
          if (k.split('.').length > 1) {
            const key = k.split('.')[1];
            obj[key] = v;
          } else obj[k] = v;
        }
        return obj;
      })
    } 



    const posts = await Posts.findAll({
      attributes: [
        'postId',
        'title',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
      ],
      include: [
        {
          model: Users,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Likes,
          attributes: [],
          required: true,
          where: {
            [Op.and]: [{ UserId: userId }],
          },
        },
      ],
      group: ['Posts.postId'],
      order: [['createdAt', 'DESC']],
      raw: true,
    }).then((likes) => parseLikePostsModel(likes));



    return res.status(200).json({
      data: posts,
    });
  // } catch (error) {
  //   console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
  //   return res.status(400).json({
  //     errorMessage: '좋아요 게시글 조회에 실패하였습니다.',
  //   });
  // }
});

// 좋아요 업데이트
router.put('/:postId/like', authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const isExistPost = await Posts.findByPk(postId);

    if (!isExistPost) {
      return res.status(404).json({
        errorMessage: '게시글이 존재하지 않습니다.',
      });
    }

    let isLike = await Likes.findOne({
      where: {
        PostId: postId,
        UserId: userId,
      },
    });

    if (!isLike) {
      await Likes.create({ PostId: postId, UserId: userId });

      return res
        .status(200)
        .json({ message: '게시글의 좋아요를 등록하였습니다.' });
    } else {
      await Likes.destroy({
        where: { PostId: postId, UserId: userId },
      });

      return res
        .status(200)
        .json({ message: '게시글의 좋아요를 취소하였습니다.' });
    }
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: '게시글 좋아요에 실패하였습니다.',
    });
  }
});
*/




module.exports = router;
    // console.log("like에서 postId값존재한거 뽑기");
    // let transformedPosts = likeData.map((post) => ({
    //     postId: post.postId,
    //     userId: post.userId,
    //     createdAt: post.createdAt,
    //     updatedAt: post.updatedAt,
    //   }));

    // console.log(transformedPosts);
    // res.send("끝");

    //  const likedata = await Likes.create({
    //     PostId: postId,
    //     UserId: userId,
    //   });
