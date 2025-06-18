// .env 파일을 프로그램 상에 로드한다.
require("dotenv").config();

console.log(`서버 포트 : ${process.env.PORT}`);

// 문제 1. DB_NAME, DB_USER, DB_PASSWORD, API_KEY, NODE_ENV출력
console.log(`DB_NAME : ${process.env.DB_NAME}`);
console.log(`DB_USER : ${process.env.DB_USER}`);
console.log(`DB_PASSWORD : ${process.env.DB_PASSWORD}`);
console.log(`API_KEY : ${process.env.API_KEY}`);
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);

// 값이 존재하지 않을 경우를 대비한 기본값 설정
console.log(`디비 포트 : ${process.env.DB_PORT || 5432}`);

if (!process.env.OPEN_API_KEY) {
  console.log(`오픈 api 키가 필요합니다.`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log(`개발환경에서의 로직 처리`);
} else {
  console.log(`운영환경에서의 로직 처리`);
}
