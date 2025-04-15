import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const GITHUB_USERNAME = 'vhjihuang'; // 替换成你的 GitHub 用户名
const TOKEN = process.env.GITHUB_TOKEN;
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 获取所有仓库
app.get('/repos', async (req, res) => {
  try {
    const repoRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: { Authorization: `token ${TOKEN}` },
    });
    res.json(repoRes.data);
  } catch (e) {
    res.status(500).json({ message: '获取仓库失败', error: e.message });
  }
});

// 获取单个仓库语言占比
app.get('/repos/:repoName/languages', async (req, res) => {
  const { repoName } = req.params;
  try {
    const langRes = await axios.get(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: { Authorization: `token ${TOKEN}` },
      }
    );
    res.json(langRes.data);
  } catch (e) {
    res.status(500).json({ message: '获取语言失败', error: e.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 中转服务运行中: http://localhost:${port}`);
});
