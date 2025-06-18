// 간단한 웹서버 만들기
const http = require("http");

// req: http 요청, res: http 응답
// 나만의 웹서버 (내부에 인자로 콜백함수 하나가 들어감)
const server = http.createServer((req, res) => {
  // 요청이 올때마다 실행되는 콜백 함수
  // 브라우저에게 응답은 200 성공이고, 컨텐트 타입은 텍스트, 문자열 인코딩 포맷은 utf-8 임을 알려줌
  res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  // 본문에 하위 내용을 클라이언트에게 보내줌
  res.end("안녕하세요. 첫번째 웹서버에 오셨습니다.");
});

const PORT = 3000;
server.listen(PORT, () => {
  // 서버가 3000번 포트로 요청을 기다리고 있습니다.
  console.log(`나만의 웹서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
});
