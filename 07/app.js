const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const models = require("./models");
const { logger, logging } = require("./middlewares/logger");

const app = express();

// 미들웨어 설정
app.use(logging); // 로깅 미들웨어
app.use(express.json()); // json 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// Swagger 설정
// swagger.yaml 파일에서 문서 로딩
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
// http://localhost:3000/api-docs 경로로 Swagger UI를 제공
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// notes url로 들어오는 주소는 전부 noteRouter로 처리
app.use("/notes", noteRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

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
