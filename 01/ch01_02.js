let pi;
console.log(pi); // undefined
pi = 3.141592;
console.log(pi); // 3.141592

let radius = 12;
console.log(`넓이: ${pi*radius*radius}`); // pi * r^2
console.log(`둘레: ${pi*2*radius}`); // 2 * pi * r

// 문제1: area 라는 변수를 만들고 radius가 15인 경우 area 넓이를 구하라.
radius = 15;
let area = pi * radius * radius;
console.log(`넓이: ${area}`);

// 문제2: 사각형의 넓이를 계산 width, height 에서 각각 값을 넣고 area2 라는 변수에 넓이를 넣어보시오. area2 를 출력
let width = 10;
let height = 14;
let area2 = width * height;
console.log(`사각형의 넓이: ${area2}`);

// 증감 연산자
let num = 0;
num++; // num = num+1
console.log(num);
num--;
console.log(num);

// 형변환
console.log(String(52)); // 문자열 "52"
console.log(typeof String(52));

console.log(Number("52")); // 숫자 52
console.log(typeof Number("52"));

console.log(parseInt("1234")); // "1234" -> 1234
console.log(parseInt("1234.56")); // 1234 (int)
console.log(parseFloat("1234.56")); // 1234.56 (float)

console.log(Number("hello"));
console.log(isNaN(Number("hello")));

console.log(typeof 10);
console.log(typeof "hello");
console.log(typeof true);
console.log(typeof function(){});
console.log(typeof {});
console.log(typeof []);

const test = "변경불가";
// test = "변경 시도"; // 에러 발생
console.log(test);
// 상수로 선언하면 변경 불가능