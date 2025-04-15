import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const GITHUB_USERNAME = 'vhjihuang'; // Replace with your GitHub username
const TOKEN = process.env.GITHUB_TOKEN;

// Get all repositories
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

// Get language distribution for a specific repository
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
    res.status(500).json({ message: 'Failed to fetch languages', error: e.message });
  }
});

// Export for serverless function (for Vercel)
export default function handler(req, res) {
  app(req, res);
}
