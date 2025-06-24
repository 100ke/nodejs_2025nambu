const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1. 회원 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], // 사용자 이름이 2자리부터 5자리 까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // 이메일 형식만 허용
      },
    },
    password: {
      // 단방향 암호화 Bcrypt
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), // 정해진 두 개 중에만 가능
      defaultValue: "active",
    },
  },
  { tableName: "user" }
);

(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "홍길동",
    email: "ex1@example.com",
    password: "1234555",
    age: 40,
  });
  const user2 = await User.create({
    username: "황만덕",
    email: "ex2@example.com",
    password: "1234555",
    age: 26,
  });
  const user3 = await User.create({
    username: "강래원",
    email: "ex3@example.com",
    password: "1234555",
    age: 24,
  });
  const user4 = await User.create({
    username: "이강이",
    email: "ex4@example.com",
    password: "1234555",
    age: 25,
  });
  const user5 = await User.create({
    username: "김태헌",
    email: "ex5@example.com",
    password: "1234555",
    age: 24,
  });

  const users1 = await User.findAll({
    where: {
      email: {
        [Op.like]: "%example%",
      },
    },
  });

  console.log(
    users1.map((u) => {
      return {
        email: u.email,
        name: u.username,
      };
    })
  );

  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["홍길동", "황만덕"],
      },
    },
  });
  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 26, // lt: less than == '<', gt: greater than '>'
        // lte == '<=', gte == '>=
      },
    },
  });
  console.log(users3);
})();
