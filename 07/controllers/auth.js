const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // password 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  res.status(201).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. 이메일로 사용자가 존재하는지 확인
  const user = await models.User.findOne({
    where: { email: email },
  });
  // 2. 사용자가 없다면 안내 메시지 출력
  if (!user) {
    return res.status(400).json({ message: "invalid email and password" });
  }
  // 3. 사용자가 존재하면 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // 비밀번호가 일치하지 않으면 사용자에게 안내 메시지 출력
    return res.status(400).json({ message: "invalid email and password" });
  }
  // 4. 정당한 사용자(이메일과 비밀번호가 일치하면) 임시허가증 발급
  const accessToken = generateAccessToken(user);
  res.json({ message: "ok", accessToken: accessToken, user });
};

module.exports = {
  register,
  login,
};
