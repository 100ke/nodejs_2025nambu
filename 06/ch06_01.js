const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

// create table posts (
//     title Text,
//     content Text,
//     author Text,
// )

// 시퀄라이즈는 프라미스를 사용하기 때문에 async/await 활용
// 즉시 실행 함수
(async () => {
  await sequelize.sync({ force: false }); // true일 경우 계속 새로 생성

  const post1 = await Post.create({
    title: "오늘 실습",
    content: "sequelize",
    author: "100ke",
  });
  //   console.log(`post1 create => ${JSON.stringify(post1)}`);

  const post2 = await Post.create({
    title: "오늘 점심 메뉴",
    content: "먹을게 없다",
    author: "100ke",
  });
  //   console.log(`post1 create => ${JSON.stringify(post2)}`);

  // select * from posts
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);

  // select * from posts where id =1
  const post3 = await Post.findByPk(1);
  console.log(`post3 => ${JSON.stringify(post3)}`);

  const post4 = await Post.findOne({
    where: {
      author: "100ke",
    },
  });
  console.log(`post4 => ${JSON.stringify(post4)}`);

  await Post.update(
    {
      title: "ORM 실습 주간",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post5 = await Post.findByPk(1);
  console.log(`post5 => ${JSON.stringify(post5)}`);

  // 삭제
  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const post6 = await Post.findByPk(1);
  console.log(`post6 => ${JSON.stringify(post6)}`);
})();
