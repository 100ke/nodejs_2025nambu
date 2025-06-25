"use strict";
// 필요한 모듈 임포팅
const fs = require("fs"); // todos.js 같은 파일을 읽기 위해
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process"); // 환경변수 처리를 위해
const basename = path.basename(__filename); // index.js가 위치한 디렉토리
const env = process.env.NODE_ENV || "development"; // 환경변수에 NODE_ENV가 없으면 development 사용
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// sequelize 객체 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// index.js 디렉토리에 있는 파일을 모두 읽는데, 확장자가 없거나 .js 아니거나
// .test.js로 끝나는 파일이 아닌 경우를 모두 읽음
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // 읽은 파일 목록을 순회하면서 파일 당 해야할 작업
    // require("./todo.js")
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    // db["Todo"] = Todo
    // db["Post"] = Post
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
