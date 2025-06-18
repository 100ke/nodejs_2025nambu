// 반복문
let arr = [5, 23, "hello", true, "world", -9];
console.log(arr);
console.log(arr[1]);

// for (초기조건; 종료조건; 증감식)
for (let i = 0; i < arr.length; i++) {
    console.log(`${i} is ${arr[i]}`);
}

console.log('----------for in-----------');
// for in (i에 index가 담김)
for(i in arr) {
    console.log(`${i} is ${arr[i]}`);
}

console.log('----------for of-----------');
// for of (e에 요소가 담김)
for(e of arr) {
    console.log(e);
}

console.log('----------break-----------');
for(i in arr) {
    if (typeof arr[i] == "string") {
        break;
        // 만나면 Loop 종료
    }
    console.log(arr[i]);
}
console.log('----------continue-----------');
for(i in arr) {
    if(typeof arr[i]=="string") {
        continue;
        // 이후 로직을 수행하지 않고 다음 loop로 돌아감
    }
    console.log(arr[i]);
    
}
// 문제 1. 배열: [1,2,"멈춰",3,4,true, false]에서 멈춰가 나오면 멈추는 코드를 만들어보시오.
console.log('----------문제1-----------');
const p1 = [1,2,"멈춰",3,4,true, false];
for (i in p1) {
    if (p1[i]==="멈춰") {
        break;
    }
    console.log(p1[i]);
}

// 문제 2. 배열 [5,10,15,20,25] 에서 20이상이 나오면 멈추는 코드를 작성하시오.
console.log('----------문제2-----------');
const p2 = [5,10,15,20,25];
for (i in p2) {
    if (p2[i] >= 20) {
        break;
    }
    console.log(p2[i]);
}

// 문제 3. 배열 [1,2,...,10]에서 짝수만 나오는 코드를 만들어보시오.
console.log('----------문제3-----------');
const p3 = [1,2,3,4,5,6,7,8,9,10];
for(i in p3) {
    if (p3[i]%2==1) {
        continue;
    }
    console.log(p3[i]);
}

// 문제 4. 1~10까지 돌면서 3의 배수는 건너뛰고 나머지를 출력하는 코드를 만들어보시오.
console.log('----------문제4-----------');
// for(i in p3) {
//     if(p3[i]%3==0) {
//         continue;
//     }
//     console.log(p3[i]);
// }
for (let i = 0; i <= 10; i++) {
    if (i % 3 == 0) {
        continue;
    }
    console.log(i);
}

// 문제 5. ["사과", 1, "바나나", 2, "포도", false]에서 문자열만 나오는 코드를 작성
console.log('----------문제5-----------');
const p5 = ["사과", 1, "바나나", 2, "포도", false];
for(i in p5) {
    if (typeof p5[i] == "string") {
        console.log(p5[i]);
    }
}