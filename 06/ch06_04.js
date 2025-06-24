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

// 2. 게시판 모델 정의
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// 3. 댓글 모델 추가
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);

User.hasMany(Post, {
  foreignKey: "authorId", // FK 컬럼명 지정
}); // 1(user) : N(post)
Post.belongsTo(User, {
  foreignKey: "authorId", // 동일한 FK 컬럼명 지정
}); // N(post) : 1(User)
// post 테이블에 foriegn key로 user를 참조

// User <-> Comment
User.hasMany(Comment, { foreignKey: "userId" }); // 동일한 컬럼명 지정
Comment.belongsTo(User, { foreignKey: "userId" }); // 여기서 FK 컬럼명 지정

// Comment <-> Post
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });

  // Post 테이블에는 1명의 user id 가 있다.
  // 데이터 생성

  // 1. 사용자 정보
  const user1 = await User.create({
    username: "홍길동",
    email: "hong@test.com",
    password: "123412",
    age: 40,
  });
  const user2 = await User.create({
    username: "백혜윤",
    email: "baek@test.com",
    password: "123412",
    age: 28,
  });

  // 2. 게시글 정보
  const post1 = await Post.create({
    title: "맛집 정보",
    content: "게시글 내용",
    // UserId: user2.id,
    authorId: user2.id,
  });
  const post2 = await Post.create({
    title: "오늘의 일기",
    content: "날씨 흐림",
    // UserId: user2.id,
    authorId: user2.id,
  });

  const comment1 = await Comment.create({
    content: "비가 올 것 같아요.",
    userId: user1.id,
    postId: post2.id,
  });
  const comment2 = await Comment.create({
    content: "8시부터 온다네요.",
    userId: user2.id,
    postId: post2.id,
  });
  const comment3 = await Comment.create({
    content: "우산 챙기기",
    userId: user1.id,
    postId: post2.id,
  });

  const posts = await Post.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Comment,
        include: [User],
      },
    ],
  });
  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`users => ${JSON.stringify(users)}`);
})();
