// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

// formdata, multi part form 데이터를 받기 위한 미들 웨어 설정
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));
// http://localhost:3000/downloads/aa.png

// 멀터 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 이 파일이 있는 디렉토리 하위로 uploadDir 생성
  filename: function (req, file, cb) {
    // (file.originalname).name : aa
    // -
    // 178104951
    // .png
    // fname = aa-178104951.png
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

// 첨부파일 과정
// 1. POST /posts 요청이 들어오면 먼저 upload.single("file") 미들웨어를 탄다.
// upload  미들웨어의 역할은 첨부파일을 uploadDir 폴더에 aa-12314.png파일로 저장
// req 객체에 첨부파일 정보를 실어준다.
// 2. 우리가 만든 핸들러 함수에서 req.file 객체에서 파일 정보를 사용할 수 있다.
app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; // filename : aa-12314.png
  filename = `/downloads/${filename}`; // http://localhost:3000/ + filename
  // -> http://localhost:3000/downloads/aa-12314.png

  // 원래는 jwt 토큰에서 사용자 id를 받아와서 넣어줘야함
  // 일단 임의로 사용자를 생성하여 게시글을 넣는다
  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "백혜윤",
      email: "a@example.com",
      password: "1234512",
      // filename
      fileName: filename,
    });
  }
  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
  });
  res.status(201).json({ message: "ok", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json({ message: "ok", data: post });
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "처리할 요청이 없습니다." });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// 댓글
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  // 1. 게시물 존재 여부 체크
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 1.5 사용자 추가
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "망덕",
      email: "b@example.com",
      password: "12344542",
    });
  }
  // 2. comment 추가
  // userId는 로그인 뒤에 jwt 토큰에서 발급받아야 하지만 지금은 임의로 1 대입
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: 1,
  });
  res.status(201).json({ message: "ok", data: comment });
});

app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
});

// 댓글 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 1. 게시물 존재 여부 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 2. 댓글 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  // 3. 댓글 수정 및 저장
  if (content) {
    comment.content = content;
  }
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
});

// 댓글 삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  // 1. 게시물 존재 확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

app.listen(PORT, () => {
  console.log(`server is listening in ${PORT}`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.log("DB error");
      process.exit();
    });
});
