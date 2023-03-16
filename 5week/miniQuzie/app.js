const express = require("express");                           //서버와 통신하기 위해 express를 선언한다
const postsRouter = require("./routers/posts.router.js");     //routers폴더에 있는 posts.router 를 참조한다

const app = express();  //서버를 연다
const PORT = 3018;      //주소는 3018이다

app.use(express.json());          //json형태로 보내준다(?)
app.use('/api', [ postsRouter]);  //미들웨어로  /api를 거쳐 postRouter를 접속한다

app.listen(PORT, () => {                                 //서버가 열렸을때 실행되며 PROT값 3018을 가져온다
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');  //3018 '포트 번호로 서버가 실행되었습니다 라고 터미널에 출력한다
})