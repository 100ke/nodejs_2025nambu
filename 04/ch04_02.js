const express = require("express");
const app = express();

app.get("", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>첫번째 마이 페이지</title>
            </head>
            <body>
                <h1>첫번째 익스프레스 홈</h1>
                <nav>
                    <a href="/">홈</a>
                    <a href="/about">소개</a>
                    <a href="/contact">연락처</a>
                </nav>
                <p>익스프레스로 만든 간단한 홈페이지 입니다.</p>
            </body>
        </html>
    `);
});

app.get("/about", (req, res) => {
  res.send(`
        <h1>소개 페이지</h1>
        <p>이 홈페이지는 익스프레스 학습을 위해 만들어졌습니다.</p>
    `);
});

app.get("/contact", (req, res) => {
  res.send(`
        <h1>연락처</h1>
        <p>이메일: test@mail.com</p>
    `);
});

// 문제 1. 서버 시작 코드를 작성하시오. 포트는 3001번 입니다.
//      서버를 시작해보시고, http://localhost:3001/ 로 접속해보시오.
app.listen(3001, () => {
  console.log(`서버 시작`);
});
