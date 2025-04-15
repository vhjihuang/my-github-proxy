import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

// 加载 .env 文件中的环境变量 (主要用于本地开发, Vercel 上会使用后台配置的环境变量)
dotenv.config();

// 创建 Express 应用实例
const app = express();

// 启用 CORS (允许跨域请求)
app.use(cors());

app.use(express.json());

// --- 配置 ---
// 替换为你的 GitHub 用户名
const GITHUB_USERNAME = 'vhjihuang';
// 从环境变量获取 GitHub Token (必须在 Vercel 中设置)
const TOKEN = process.env.GITHUB_TOKEN;
// --- 配置结束 ---


// 在你的 server.js 文件中添加
app.get('/test', (req, res) => {
  res.send('Hello from /test!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});