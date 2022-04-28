const express = require("express");
const cors = require("cors");
const fs = require("fs");
// MySQL DB 연동
const { sequelize } = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const {
    user,
} = require("./router");

const app = express();
const PORT = 80;
const SECRET = process.env.SECRET;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT 시크릿 설정
app.set("jwt-secret", SECRET);

// 서버 상태 확인
app.get("/", (req, res) => {
    res.send("Success !! User Auth");
});

sequelize.sync({force: false}).then(()=>{
    console.log("DB 연동 성공");
}).catch((err)=>{
    console.log("DB 연동 실패 :", err);
});

// API
app.use(user);

app.listen(PORT, () => {
    console.log(`${PORT} 로 연결 중입니다.`);
})