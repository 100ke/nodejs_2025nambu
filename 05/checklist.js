const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");

// db setting
const db_name = path.join(__dirname, "checklist.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

// 1. 데이터베이스 테이블 생성
const create_table_sql = `
    create table if not exists checklist (
        id integer primary key autoincrement,
        category text not null,
        item text not null,
        amount integer,
        checkyn boolean default 0 
    );
`;

db.exec(create_table_sql);

// 1. 체크리스트 입력
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;
  let sql = `
        insert into checklist(category, item, amount)
        values(?, ? ,?);
    `;
  const result = db.prepare(sql).run(category, item, amount);
  const newData = db
    .prepare(`select * from checklist where id =?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newData });
});

// 2. 체크리스트 조회
app.get("/checklist", (req, res) => {
  const q = req.query.q;
  let sql = `
    select * from checklist where category =?;
  `;
  const rows = db.prepare(sql).all(q);
  res.status(200).json({ message: "ok", data: rows });
});

// 3. 체크 수정 (토글)
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        update checklist set checkyn = case checkyn when 1 then 0 else 1 end where id =?
    `;
  db.prepare(sql).run(id);
  const item = db.prepare(`select * from checklist where id =?`).get(id);
  res.status(200).json({ message: "ok", date: item });
});

// 체크리스트 내용 수정
// app.put("/checklist/:id", (req, res) => {
//   const id = req.params.id;
//   const { category, item, amount } = req.body;
//   let sql = `
//     update checklist set category =?, item=? , amount=?
//     where id =?
//   `;
//   db.prepare(sql).run(category, item, amount, id);
//   const updatedData = db
//     .prepare(`select * from checklist where id = ?`)
//     .get(id);
//   res.status(200).json({ message: "ok", data: updatedData });
// });

// 4. 삭제
app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    delete from checklist where id=?
  `;
  const result = db.prepare(sql).run(id);
  if (!result.changes == 0) {
    res.status(404).json({ message: "항목을 찾을 수 없습니다." });
  }
  res.status(204).send();
});

app.listen(PORT, () => {});
