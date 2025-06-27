const models = require("../models");
const bcrypt = require("bcryptjs");

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

module.exports = {
  register,
};
