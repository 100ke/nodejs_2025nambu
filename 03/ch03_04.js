const validator = require("validator");

const email = "test!example.com";
console.log(`이메일 검증: ${email}은 ${validator.isEmail(email)}`);

const url = "http://www.naver.com";
console.log(`URL 검증: ${url}은 ${validator.isURL(url)}`);

const ip = "3.35.152.150";
console.log(`IP 검증: ${ip}는 ${validator.isIP(ip)}`);

const phone = "010-3330-1111";
console.log(
  `전화번호 검증: ${phone}은 ${validator.isMobilePhone(phone, "ko-KR")}`
);

const num1 = "12345";
console.log(`숫자 검증: ${num1} ${validator.isNumeric(num1)}`);

const date1 = "2025-08-20";
console.log(`날짜 검증: ${date1} ${validator.isDate(date1)}`);

const password1 = "password123!";
const v1 = validator.isStrongPassword(password1, {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
});
console.log(`비밀번호 ${password1}은 ${v1}`);
