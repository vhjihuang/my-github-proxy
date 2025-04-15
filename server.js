import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const GITHUB_USERNAME = 'vhjihuang'; // 替换为你的 GitHub 用户名
const TOKEN = process.env.GITHUB_TOKEN;

// 获取所有仓库
app.get('/repos', async (req, res) => {
  try {
    const repoRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: { Authorization: `token ${TOKEN}` },
    });
    res.json(repoRes.data);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch repositories', error: e.message });
  }
});

// 获取单个仓库的语言分布
app.get('/repos/:repoName/languages', async (req, res) => {
  const { repoName } = req.params;
  if (!/^[a-zA-Z0-9-_]+$/.test(repoName)) {
    return res.status(400).json({ message: 'Invalid repository name' });
  }
  try {
    const langRes = await axios.get(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: { Authorization: `token ${TOKEN}` },
      }
    );
    res.json(langRes.data);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch languages', error: e.message });
  }
});

// 导出处理函数以适配 Vercel
export default function handler(req, res) {
  app(req, res);
};