const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "ok", data: note });
});

app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ message: "ok", data: notes });
});

app.get("/notes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: {
      tag: tag,
    },
  });
  res.status(200).json({ message: "ok", data: notes });
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;
  const note = await models.Note.findByPk(id);
  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;
    await note.save();
    res.status(200).json({ message: "ok", data: note });
  } else {
    res.status(404).json({ message: "처리할 요청이 없습니다." });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

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
