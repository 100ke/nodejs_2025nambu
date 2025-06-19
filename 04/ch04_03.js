const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "Node.js 기본서", author: "홍길동" },
  { id: 2, title: "한눈에 보는 Node.js", author: "홍길동" },
  { id: 3, title: "Node.js 디자인패턴", author: "홍길동" },
];

app.use(express.json()); // 미들웨어, 응답과 요청시에 JSON을 처리 담당

app.get("/books", (req, res) => {
  res.json(books);
});

// :id 는 id가 변화하는 값을 의미
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((b) => b.id === parseInt(id)); // === 타입, 값이 모두 동일해야 true
  if (!book) {
    return res.status(404).json({ message: "책을 조회할 수 없습니다." });
  }
  res.json(book); // status 200
});

app.post("/books", (req, res) => {
  const { title, author } = req.body; // 요청 본문에서 title, author 를 추출
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book); // push: 배열에 book 객체 추가
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;
  const book = books.find((book) => book.id === parseInt(id));
  if (!book) {
    return res.status(404).json({ error: "책을 조회할 수 없습니다." });
  }
  book.title = title;
  book.author = author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "책을 조회할 수 없습니다." });
  }
  books.splice(index, 1);
  res.status(204).send(); // 204: No Content - 요청은 성공했지만 보낼 컨텐츠는 없음
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);
});

// 서버 실행하고 http://localhost:3000/books 접속하여 화면에 어떻게 뜨는지 확인
