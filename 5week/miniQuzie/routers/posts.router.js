const express = require("express");       //서버와 통신하기 위해 express를 선언한다
const { Posts } = require("../models");   //models에 구현된 자료 posts.js를 가져온다
const router = express.Router();          //express에 지원하는 Router를 가져온다

//게시글 생성
router.post("/posts", async (req, res) => {   // post를 받으며 접속할 주소는 /api/posts, async 동기문처리
  try {                                       //오류문을 잡기위해 try ,catch 사용
    const { title, content } = req.body;      //body에서 입력한  title,content를 가져온다

    
    let post = await Posts.create({          //모델 Posts에서 구현한 자료 바탕으로 생성한다
        title,                               //title 자리에 req에 받아온 title를 넣어준다
        content,
    });

    post = {                        //★ createAt,updatedAt을 지우지 못하였기에 다시 정리하여 선언한다
      id : post.id,                 //post에 들어가는 값은 id,title,content이며
      title : post.title,           //그 값은 변함없이 다시 넣어준다
      content : post.content,
    }

    return res.status(201).json(post );  //  http상태코드 201번과 body 출력창에 post정보를 보여준다
  } catch (err) {                   //에러를 발생했을때 여기로 넘어오게되며 err를 받아온다
    console.log(err);               //err를 받아 터미널에 출력한다
    return res                      //연산 최종 결과를 돌려준다
    .status(400)                    //http상태코드 400(오류)를 보내준다
    .json({ errorMessage: "게시글 생성에 실패하였습니다" });  //body 출력창에 errorMessage: "게시글 생성에 실패하였습니다 띄어준다
  }
});

//게시글 목록 조회
router.get("/posts", async (req, res) => {        //get을 받으며 주소는 /api/posts 이다
  
  let posts = await Posts.findAll({               //await 동기적으로 Posts에서 찾는다
    attributes: ["id","title", "content"],        //post_id, title, content 자료들을 찾는다
  });

  return res.status(200).json(posts);             // ★ 배열로 출력 하는 것은 구현하지 못하였습니다
});

module.exports = router;                        //다른 파일에서도 roter에담겼던 내용을 찾고 사용가능하도록 한다
