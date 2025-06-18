const moment = require("moment");

const nowDate = moment(); // 현재 시각을 가져온다.
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 문제 1. 현재 날짜를 2025/06/18 형태로 출력해보시오.
console.log(nowDate.format("YYYY/MM/DD"));

// 날짜 포맷팅 : 특정 날짜의 문자열을 모멘트 객체 형태로 바꿀 수 있다.
const dateMoment = moment("2024-03-10");
console.log(dateMoment);

// 시간 추가 및 빼기
const nextDays = nowDate.add(5, "days"); // nowDate에 변경사항이 적용됨
console.log(nextDays);

// 시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log("과정 종료까지 남은 일 수", diffDay);

// 문제 2. 오늘부터 100일 후의 날짜를 YYYY년 MM월 DD일로 출력해보시오.
const today = moment();
const ex2 = today.add(100, "days");
console.log(ex2.format("YYYY년 MM월 DD일"));
console.log(
  `${moment().format("YYYY년 MM월 DD일")}에서 100일 후의 날짜는 ${ex2.format(
    "YYYY년 MM월 DD일"
  )}`
);

// 문제 3. 2024-03-15 부터 2025-09-20 까지 몇 개월이 지났는지 계산해보시오.
const ex3start = moment("2024-03-15");
const ex3end = moment("2025-09-20");
const ex3diffMonths = ex3end.diff(ex3start, "months");
console.log(ex3diffMonths);

// 문제 4. 크리스마스까지 남은 일수를 계산해보시오.
const ex4today = moment();
const ex4diffDays = moment("2025-12-25").diff(ex4today, "days");
console.log(ex4diffDays);

const s = moment();
const e = moment("2025-12-25");
const mb = e.diff(s, "days");
console.log(mb);

// 요일
const s2 = moment();
console.log(`요일: ${s2.format("d")}`); // 3
console.log(`요일: ${s2.format("dd")}`); // We
console.log(`요일: ${s2.format("ddd")}`); // Wed
console.log(`요일: ${s2.format("dddd")}`); // Wednesday

// 요일 한글로 출력하기
require("moment/locale/ko"); // 한국어 로케일 불러오기
moment.locale("ko"); // 한국어 로케일 설정
const s3 = moment();
console.log(`요일: ${s3.format("d")}`);
console.log(`요일: ${s3.format("dd")}`);
console.log(`요일: ${s3.format("ddd")}`);
console.log(`요일: ${s3.format("dddd")}`);

// 문제 5. 올해 크리스마스는 무슨 요일일까요?
console.log(moment("2025-12-25").format("dddd"));
const ex5 = moment("2025-12-25");
console.log(`올해 크리스마스는 ${ex5.format("dddd")}입니다.`);

// 문제 6. 본인의 태어난 날의 요일을 출력해보시오.
console.log(moment("1998-03-10").format("dddd"));
