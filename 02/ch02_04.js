const users = [
  { id: 1, name: "홍길동", age: 25, score: 75 },
  { id: 2, name: "김철수", age: 22, score: 88 },
  { id: 3, name: "이영희", age: 24, score: 95 },
  { id: 4, name: "박지훈", age: 21, score: 59 },
  { id: 5, name: "정현우", age: 26, score: 64 },
  { id: 6, name: "한지민", age: 28, score: 82 },
  { id: 7, name: "윤아름", age: 23, score: 91 },
  { id: 8, name: "이수진", age: 27, score: 77 },
];

// filter
const youngs = users.filter((user) => {
  //   console.log(user);
  return user.age < 25;
});
console.log(youngs); // return 조건에 해당하는 요소만 반환하여 새 배열 생성
// select * from users where age < 25;

// 문제 1. 점수가 80점 미만인 사람만 조회
console.log("------문제1-----");
const under80 = users.filter((user) => {
  return user.score < 80;
});
console.log(under80);

// map
const userNames = users.map((user) => {
  return user.name;
});
console.log(userNames);

// 문제 2. 아이디와 이름만 반환하는 배열을 만들어보시오.
console.log("------문제2-----");
const idName = users.map((user) => {
  //   return `${user.id}: ${user.name}`;
  return { id: user.id, name: user.name };
});
console.log(idName);

// 문제 3. 성적이 80점 이상인 사람들의 아이디, 이름, 성적을 조회하시오.
console.log("------문제3-----");
const ex3 = users
  //   .filter((user) => {
  //     return user.score >= 80;
  //   })
  .filter((user) => user.score >= 80)
  .map((user) => {
    return { id: user.id, name: user.name, score: user.score };
  });
console.log(ex3);

// forEach
users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score}입니다.`);
});

// reduce 함수
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);
console.log(totalScore);

// 문제 4. 나이가 25 이상인 사람들의 전체 점수를 구하시오.
console.log("------문제4-----");
const ex4 = users
  .filter((user) => {
    return user.age >= 25;
  })
  .reduce((sum, user) => {
    return sum + user.score;
  }, 0);

console.log(ex4);

const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age;
  // a.age - b.age 가 음수이면 a가 b 앞에 있고
  // a.age - b.age 가 양수이면 a가 b 뒤로 가고
  // a.age - b.age 가 0이면 아무것도 안한다.
}); // 나이를 오름차순으로 정렬한다.

console.log(sortedByAge);
