// 1. Express 모듈 가져오기
const express = require("express");
// 2. Express 애플리케이션 설정
const app = express();
// 3. 포트 설정
const PORT = 3000;

// 4. 라우팅 설정
// app.get: GET 요청을 처리하는데 http://localhost:3000/
app.get("/", (req, res) => {
  // req: http 요청 , res: http 응답
  res.send("Hello World!");
});

// http://localhost:3000/hello GET
app.get("/hello", (req, res) => {
  // req: http 요청 , res: http 응답
  res.send("/hello 주소에 접근하셨습니다.");
});

// 문제 1. http://localhost:3000/world GET 요청할 경우 응답을 "/world 주소에 접근하셨습니다." 보내는
//      라우터를 만들어보시오.
app.get("/world", (req, res) => {
  res.send("/world 주소에 접근하셨습니다.");
});

// 5. 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
});
