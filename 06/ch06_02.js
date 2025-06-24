const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "users" }
);

(async () => {
  // 1. 모델을 통해 테이블 생성
  await sequelize.sync({ force: true });

  // 2. 사용자 2명 생성 후 결과를 각각 출력
  const user1 = await User.create({
    username: "백혜윤",
    password: "test12",
    email: "100ke@test.com",
    birthDate: "1998-03-10",
  });
  console.log(`user1 info: ${JSON.stringify(user1)}`);

  const user2 = await User.create({
    username: "준이",
    password: "jun2babo",
    email: "junkr@test.com",
    birthDate: "1991-01-05",
  });
  console.log(`user1 info: ${JSON.stringify(user2)}`);

  // 3. 사용자 전체 검색
  const userList = await User.findAll();
  console.log(`사용자 목록: ${JSON.stringify(userList)}`);

  // 4. 사용자 아이디 2번인 사람 출력
  const findPk2 = await User.findByPk(2);
  console.log(`2번 사용자 정보: ${JSON.stringify(findPk2)}`);

  // 5. 사용자 아이디 2번인 사람의 email을 수정하고 출력
  await User.update(
    {
      email: "jun2@test.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const updatePk2 = await User.findByPk(2);
  console.log(`2번 사용자 수정: ${JSON.stringify(updatePk2)}`);

  // 6. 사용자 아이디가 2번인 사람을 삭제하고, 2번인 사람 출력
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const deletePk2 = await User.findByPk(2);
  console.log(`2번 사용자 삭제: ${JSON.stringify(deletePk2)}`);
})();
