// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
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

// app.delete("/posts/:postId/comments/:id", async (req, res) => {

// })

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
