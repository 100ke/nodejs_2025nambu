const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});
// Todo 실습
// create table if not exists todos (
//         id integer primary key autoincrement,
//         task varchar(255),
//         description text,
//         completed boolean default 0,
//         createdAt datetime default current_timestamp,
//         priority integer default 1
//     );

// 문제 1. Todo 모델, todos 테이블 생성
// 모델 생성 참고
// completed: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
// },
// priority : {
//     type: DataTypes.INTEGER,
//     defaultValue: 1
// }
const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { tableName: "todos" }
);

// 문제 2. Todo 데이터 2개 입력
// 문제 3. Todo 데이터 전체 조회
// 문제 4. Todo 아이디가 2번인 항목 조회
// 문제 5. Todo 아이디가 2번인 항목의 completed를 완료로 바꿈
// 문제 6. Todo 아이디가 2번인 항목 삭제
(async () => {
  await sequelize.sync({ force: true });

  const todo1 = await Todo.create({
    task: "수업 복습",
    description: "ORM - sequelize 코드 복습하기",
  });
  console.log(`todo1 : ${JSON.stringify(todo1)}`);

  const todo2 = await Todo.create({
    task: "노션 정리",
    description: "express 강의 내용 전체 정리하기",
  });
  console.log(`todo2 : ${JSON.stringify(todo2)}`);

  const todolist = await Todo.findAll();
  console.log(`todolist : ${JSON.stringify(todolist)}`);

  const todoPk2 = await Todo.findByPk(2);
  console.log(`todo 2번 : ${JSON.stringify(todoPk2)}`);

  await Todo.update(
    {
      completed: true,
    },
    { where: { id: 2 } }
  );
  const updatePk2 = await Todo.findByPk(2);
  console.log(`todo 2번 : ${JSON.stringify(updatePk2)}`);

  await Todo.destroy({
    where: { id: 2 },
  });
  const deletePk2 = await Todo.findByPk(2);
  console.log(`todo 2번 : ${JSON.stringify(deletePk2)}`);
})();
