// 예를들어 홍길동 이라는 객체를 표현
const name = "홍길동"
const age = 30
const job = "developer"

const person1 = {
    name: '홍길동',
    age: 30,
    job: 'sw engineer'
}

console.log(person1.name, person1['name']);

person1.hobby = ["cook", "fishing"]
console.log(person1);
console.log(Object.keys(person1));
console.log(Object.values(person1));

person1.addAge = function() {
    this.age = this.age +1;
}
person1.addAge();
console.log(person1);

class PersonInfo {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age) {
        this.age = this.age + age;
    }

    getAge() {
        return this.age;
    }
}

let p1 = new PersonInfo("백혜윤", 28, "범안로 220");
console.log(p1);
p1.addAge(30)
console.log(p1.getAge());


// 상속
class Employee extends PersonInfo {
    constructor(name, age, address, salary) {
        super(name, age, address)
        this.salary = salary;
    }
}

let e1 = new Employee("홍길동", 30, "인천 부평", 1000000)
console.log(e1);

try {
    // ex. 데이터베이스 커넥션 얻어와서 데이터베이스에 데이터 질의
    const arr = new Array(-1)
} catch (e) {
    // 데이터 질의시 예외 발생했을 때 처리
    console.log("예외발생", e);
} finally {
    // 데이터베이스 커넥션 닫아주기
    console.log("예외가 발생해도 실행할 작업");
}

try {
    const err = new Error("나만의 에러")
    err.name = "나만의 에러"
    err.message = "나만의 에러가 완성되었습니다."
    throw err
} catch (e) {
    console.log(e.name, e.message);
}

// 문제 1. 클래스명은 CarInfo, 속성은 brand, color, model : string타입
//      메서드는 drive() -> "모델 ##가 달리는 중", stop() -> "모델 ##가 멈췄습니다."
//      객체를 2개 정도 생성후에 drive, stop 메소드 호출
console.log('--------문제1-------');
class CarInfo{
    constructor(brand, color, model) {
        this.brand = brand;
        this.color = color;
        this.model = model;
    }
    drive() {
        console.log(`모델 ${this.model}가 달리는 중`);
    }
    stop() {
        console.log(`모델 ${this.model}가 멈췄습니다.`);
    }
}

const car1 = new CarInfo("현대", "White", "아반떼");
const car2 = new CarInfo("기아", "White", "승용차");

car1.drive();
car2.stop();

// 문제 2. CarInfo 를 상속받아서 ElectricCarInfo를 만들어보시오
//      추가 속성은 battery,
//      추가로 charge() ->"모델 ##가 충전 중", stop()->"모델 ##가 멈췄습니다." 메소드 추가
//      객체를 2개 정도 생성 후에 drive, stop 메소드 호출해보기
console.log('--------문제2-------');
class ElectricCarInfo extends CarInfo {
    constructor(brand, color, model, battery) {
        super(brand, color, model);
        this.battery = battery;
    }
    charge() {
        console.log(`모델 ${this.model}가 충전 중`);
    }
}

const ec1 = new ElectricCarInfo("테슬라","blue","모델y", 4000);
const ec2 = new ElectricCarInfo("제네시스","black","전기차", 500);

ec1.charge();
ec1.stop();
ec2.charge();