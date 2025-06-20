const express = require("express"); // express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlite3 모듈 임포트
const path = require("path"); // 경로 모듈 임포트

// DB setting
const db_name = path.join(__dirname, "post.db"); // sqlite용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3 의 데이터베이스를 생성(with 데이터베이스파일)

// express setiing
const app = express(); // app이란 변수에 Express 함수를 담는다.
const PORT = 3000;
app.use(express.json()); // app.use : 미들웨어를 설정 -> 모든 요청과 응답에 json 포맷을 처리

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
db.exec(create_sql); // exec : sql을 실행시킨다.

// 게시글 작성
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
        insert into posts(title, content, author)
        values (?, ?, ?);
    `;
  // insert 쿼리문을 만들어준다.
  const stmt = db.prepare(sql); // 문자열 sql을 실제 쿼리문으로 파싱 (Statement 객체로 만듦) -> 재활용성 극대화
  stmt.run(title, content, author);
  // stmt.run: UPDATE, INSERT, DELETE
  // stmt.all: SELECT * FROM TABLE or SELECT * FROM TABLE WHERE -> [] 배열로 값을 반환
  // stmt.get: SELECT * FROM TABLE LIMIT 1 -> {} 객체로 값을 반환
  res.status(201).json({ message: "ok" });
});

// 게시글 목록 조회
// 페이지네이션
// http://localhost:3000/posts?page=2 GET
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, author, createdAt, count
        from posts order by createdAt desc
        limit ? offset ?
    `;
  const stmt = db.prepare(sql); // 쿼리 준비
  const rows = stmt.all(limit, offset); // 쿼리를 실행하고 결과는 [] 배열로 반환
  console.log(rows);
  res.status(200).json({ data: rows }); // JSON.stringify({data: rows}) 객체를 JSON 문자열로 반환
});

// 게시글 상세 정보 조회
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  // 조회수 증가
  let ac_sql = `update posts set count = count + 1 where id =?`;
  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql); // select 쿼리문 준비 완료
  const post = stmt.get(id); // 실제 쿼리문 실행 {}로 반환
  res.status(200).json({ data: post }); // json 문자열로 리턴
});

// 게시글 수정 (수정할 게시글 id, 수정할 내용 title, content)
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
        update posts set title =?, content =?
        where id =?
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, id); // 실제 쿼리문 데이터베이스에서 실행
  // res.redirect("/posts");
  res.json({ message: "ok" });
});

// 게시글 삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // 1. 삭제할 게시글 id 를 가져온다.
  let sql = `
    delete from posts where id =?
  `; // 2. 쿼리문 생성
  const stmt = db.prepare(sql); // 3. 쿼리문 준비
  stmt.run(id); // 4. 쿼리문 실행
  res.json({ message: "ok" }); // 5. 결과로 응답
});

// server start
app.listen(PORT, () => {});
