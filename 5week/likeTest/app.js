const express = require('express');
const globalRouter = require("./routes/index.js"); // 라우터 저장 관리소
const cookieParser = require('cookie-parser');

 const loginRoutes = require('./routes/login');
 const singupRoutes = require('./routes/signup');
 const postsRoutes = require('./routes/posts');
 const likesRoutes = require('./routes/likes');

const app = express();
const port = 3005;

app.use(express.json()) // 2번 답
app.use('/api', globalRouter,loginRoutes,singupRoutes,postsRoutes,likesRoutes);

app.use(cookieParser()); // 3번 답

app.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = app;
