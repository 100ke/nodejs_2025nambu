const path = require("path");

const fullPath = path.join(__dirname, "files", "test.txt");
console.log(`전체 경로: ${fullPath}`);
// __dirname : 현재 파일의 디렉토리 절대 경로를 가져온다.

// 중첩 경로 구성
// const fullPath = path.join(__dirname, "files", "a", "b", "test.txt");
// files/a/b/test.txt

// 문제 1. fullPath2 변수에 현재 디렉토리/files/task/jobs/01.txt 경로를 만들어보시오.
const fullPath2 = path.join(__dirname, "files", "task", "jobs", "01.txt");
console.log(`문제1의 경로: ${fullPath2}`);

// 경로 파싱 (경로에 대한 정보 분리)
const pathParts = path.parse(fullPath);
console.log(pathParts);

// 문제 2. fullPath2를 parse를 이용해서 경로를 분리해보시오. 변수명은 pathParts2
const pathParts2 = path.parse(fullPath2);
console.log(pathParts2);

// 확장자 가져오기
const ext = path.extname(fullPath);
console.log(ext);

// path.join로 만든 경로 실제로 생성
const fs = require("fs"); // filesystem
const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);
// fs.mkdirSync(dirPath);
// 이미 존재하는 디렉토리라면 실행 시 에러 발생 -> 반드시 예외 처리 필요
// 해당 경로가 있다면 true , 없다면 false 반환
if (!fs.existsSync(dirPath)) {
  // ! 사용하여 없을 시에만 다음 구문 실행
  fs.mkdirSync(dirPath);
}

// 문제 3. dirPath2 변수를 만들고 현재 디렉토리 밑에 tasks 디렉토리를 만들어보시오.
//      디렉토리가 존재하면 만들지 않고, 존재하지 않으면 만든다.
const dirPath2 = path.join(__dirname, "tasks");
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01"); // 경로 만들기
if (!fs.existsSync(dirPath3)) {
  // 경로 존재 여부 체크
  fs.mkdirSync(dirPath3); // 실제 디렉토리 생성
  //   fs.mkdirSync(dirPath3, {recursive: true}); // 오류 발생시 추가
}

const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉토리 생성 후 파일 생성 테스트");

// 문제 4. 현재 디렉토리 밑에 main/src/code/javascript.txt 파일을 생성하고
//      파일 안에 "자바스크립트 테스트 파일입니다." 내용 입력
//      1) 디렉토리 생성  2) 파일을 만들고 내용 작성
const dirPath4 = path.join(__dirname, "main", "src", "code");
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}
const ex4FilePath = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(ex4FilePath, "자바스크립트 테스트 파일입니다.");

// 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "rename-dir");
// line 29의 new-dir 디렉토리에 적용
fs.renameSync(dirPath, newDirPath); // 경로 변경 == 디렉토리 변경 (mv)

// 디렉토리 삭제
fs.rmdirSync(newDirPath);
