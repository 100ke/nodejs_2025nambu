const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      // 페이로드 : 토큰에 담길 유저정보
      id: user.id,
      email: user.email,
    },
    "access_token", // 키 : 토큰 서명키 (이 키를 이용하여 토큰의 유효성 검증)
    { expiresIn: "30d" } // 만료일 설정
  );
};

module.exports = {
  generateAccessToken,
};
