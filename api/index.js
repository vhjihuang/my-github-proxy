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

// // --- 配置 ---
// // 替换为你的 GitHub 用户名
const GITHUB_USERNAME = 'vhjihuang';
// // 从环境变量获取 GitHub Token (必须在 Vercel 中设置)
const TOKEN = process.env.GITHUB_TOKEN;
// // --- 配置结束 ---

app.get('/', (req, res) => {
  res.send('你好，你的 Vercel Node.js 应用已经启动！');
});

// 示例 API 接口，使用 axios 获取数据
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.json(response.data);
  } catch (error) {
    console.error('获取数据失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

app.post('/api/process', (req, res) => {
  const { data } = req.body;
  // 在这里处理接收到的数据
  console.log('接收到的数据:', data);
  res.json({ message: '数据处理成功', received: data });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;