const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// DB setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express setiing
const app = express();
const PORT = 3000;
app.use(express.json());

// 1. post.db 게시판 전용 테이블을 만든다.
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datatime default current_timestamp,
        count integer default 0
    )
`;
db.exec(create_sql);

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
        insert into posts(title, content, author)
        values (?, ?, ?);
    `;
  db.prepare(sql).run(title, content, author);
  res.status(201).json({ message: "ok" });
});

app.get("/posts", (req, res) => {
  let sql = `
        select id, title, content, author, createdAt, count
        from posts order by createdAt desc
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all();
  console.log(rows);
  res.status(200).json({ data: rows });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문 준비 완료
  const post = stmt.get(id); // 실제 쿼리문 실행
  res.status(200).json({ data: post });
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
        update posts set title =?, content =?
        where id =?
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, id); // 실제 쿼리문 데이터베이스에서 실행
  res.redirect("/posts");
});

// server start
app.listen(PORT, () => {});
