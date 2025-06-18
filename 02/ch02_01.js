// 파일 다루기 fs 모듈 이용
const fs = require("fs"); // commonjs 방식
// import fs from "fs" //es6 방식

// fs.writeFileSync("test.txt", "hello world!");
// writeFileSync: line by line
// console.log("파일 쓰기 완료");

// 문제 1. hello.txt 를 만들고, 내용에는 "안녕하세요. 반갑습니다."
// fs.writeFileSync("hello.txt", "안녕하세요. 반갑습니다.");
// console.log("hello.txt 생성");

// 파일 읽기
// const data = fs.readFileSync("test.txt", "utf-8"); // utf-8 인코딩
// 보통 euc-kr 로 인코딩 되어 글자가 깨지는 경우가 많음
// console.log(data);

// 문제 2. hello.txt 파일을 읽어서 콘솔로 출력하기
// const data2 = fs.readFileSync("hello.txt", "utf-8");
// console.log(data2);

// 파일 상태 확인
// const stats1 = fs.statSync("test.txt");
// console.log(stats1);

// 만약 hello.txt가 1기가 짜리 파일이었다면, 17라인은 16라인이 처리 끝날때 까지 대기
// Sync 함수는 비교적 작은 파일에서 사용

// fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 쓰기 완료");
// });

// 문제 3. async-hello.txt 파일 만들고, "안녕하세요. 비동기 파일 쓰기 테스트 작업입니다." 내용 생성
// fs.writeFile() 함수 사용
// fs.writeFile(
//   "async-hello.txt",
//   "안녕하세요. 비동기 파일 쓰기 테스트 작업입니다.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("비동기 파일 쓰기 테스트 2");
//   }
// );

// fs.readFile("async-test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("읽기 에러", err);
//   }
//   console.log("비동기 파일 읽기: ", data);
// });

// 문제 4. async-hello.txt 를 fs.readFile로 읽어보시오.
// fs.readFile("async-hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("읽기 에러", err);
//   }
//   console.log("비동기 파일 읽기: ", data);
// });

// Promise
// 코드 가독성도 높이면서 콜백지옥 방지
const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    await fsPromise.writeFile("promise-test.txt", "Promise Hello World");
    // writeFile 의 리턴값은 프라미스를 반환하기 때문에 await 사용 가능
    console.log("파일 쓰기 완료");

    const data = await fsPromise.readFile("promise-test.txt", "utf-8");
    console.log("파일 읽기: ", data);
  } catch (e) {
    console.log(e);
  }
};

fileOp();

// 문제 5. fileOp2 함수를 만들고 promise 방식으로 promise-hello.txt 파일을 만들고
//          "안녕하세요. 프로미스 방식으로 파일을 읽기 테스트입니다." 내용을 입력한다.
//          그리고 promise-hello.txt 파일을 읽어서 콘솔에 출력하라.
const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요. 프로미스 방식으로 파일을 읽기 테스트입니다."
    );
    console.log("문제 5)파일 생성 완료");

    const data = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log("문제 5) 파일 읽기: ", data);
  } catch (e) {
    console.log(e);
  }
};

fileOp2();
