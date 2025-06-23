const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// DB setting
const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json()); // middleware -> 전체 엔드포인트에 특정 기능을 일괄적용

// date -> YYYY-MM-DD
const create_sql = `
    create table if not exists expenses (
        id integer primary key autoincrement,
        title text not null,
        amount integer not null,
        date text not null,
        memo text
    )
`;

db.exec(create_sql);

// 1. 가계부 입력 POST /expenses
app.post("/expenses", (req, res) => {
  const { title, amount, date, memo } = req.body;
  let sql = `
    insert into expenses(title, amount, date, memo)
    values (?, ?, ?, ?)
  `;
  db.prepare(sql).run(title, amount, date, memo);
  res.status(201).json({ message: "ok" });
});

// 2. 가계부 전체 목록 조회 GET /expenses
app.get("/expenses", (req, res) => {
  let sql = `
        select title, amount, date 
        from expenses
    `;
  const rows = db.prepare(sql).all();
  res.status(200).json({ message: "ok", data: rows });
});

// 3. 가계부 목록 조회 (날짜별) GET /expenses/2025-06-23
app.get("/expenses/:date", (req, res) => {
  const date = req.params.date;
  let sql = `
        select * from expenses
        where date = ?
    `;
  const rows = db.prepare(sql).all(date);
  res.status(200).json({ message: "ok", data: rows });
});

// 4. 가계부 수정 PUT /expenses/12 -> 금액, 항목 등 수정, 12:아이디
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, memo } = req.body;
  let sql = `
    update expenses set title =? , amount=?, memo=?
    where id =? 
  `;
  db.prepare(sql).run(title, amount, memo, id);
  res.status(201).json({ data: "ok" });
});

// 5. 가계부 삭제 DELETE /expenses/12 -> 해당 가계부의 항목 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    delete from expenses where id=?
  `;
  db.prepare(sql).run(id);
  res.status(201).json({ message: "ok" });
});

app.listen(PORT, () => {});
