const path = require("path");
const express = require("express");
const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const models = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// notes url로 들어오는 주소는 전부 noteRouter로 처리
app.use("/notes", noteRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);

// 모든 라우터의 최하단에 404 페이지 처리
app.use((req, res) => {
  res
    .status(404)
    .json({ status: "Fail", message: "요청한 리소스는 찾을 수 없습니다." });
});

// 500에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "Error", message: "서버에서 에러 발생" });
  // res.status(500).json({status: "Error", message: `server error: ${err.stack}`}) // 디버깅용
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:3000 으로 Note 서버 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`db connect`);
    })
    .catch(() => {
      console.log(`db error!`);
      process.exit();
    });
});
