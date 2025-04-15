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

// --- 配置 ---
// 替换为你的 GitHub 用户名
const GITHUB_USERNAME = 'vhjihuang';
// 从环境变量获取 GitHub Token (必须在 Vercel 中设置)
const TOKEN = process.env.GITHUB_TOKEN;
// --- 配置结束 ---

// --- 路由定义 ---

// 路由：获取指定用户的所有公开仓库列表
app.get('/repos', async (req, res) => {
  // 检查 Token 是否已配置
  if (!TOKEN) {
    console.error('Error: GITHUB_TOKEN environment variable is not set.');
    // 返回 500 错误，因为这是服务器配置问题
    return res.status(500).json({ message: '服务器配置错误：缺少 GitHub 令牌。' });
  }

  try {
    console.log(`Workspaceing repos for user: ${GITHUB_USERNAME}`);
    // 向 GitHub API 发送请求获取仓库列表
    const repoRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        // 使用 Token 进行认证，提高速率限制并允许访问私有仓库（如果 Token 有权限）
        Authorization: `token ${TOKEN}`,
        // 推荐添加 Accept header
        Accept: 'application/vnd.github.v3+json',
      },
      // 可以添加参数，比如每页数量，排序方式等
      // params: {
      //   per_page: 100, // 例如，增加每页返回的数量
      //   sort: 'updated' // 按更新时间排序
      // }
    });
    // 成功，返回获取到的仓库数据
    res.json(repoRes.data);
  } catch (e) {
    // 请求失败，记录错误日志
    console.error(`Failed to fetch repositories for ${GITHUB_USERNAME}:`, e.message);
    // 如果有响应错误，打印状态码
    if (e.response) {
      console.error(`GitHub API responded with status: ${e.response.status}`);
    }
    // 返回 500 内部服务器错误
    res.status(500).json({ message: '获取仓库列表失败', error: e.message });
  }
});

// 路由：获取指定仓库的语言使用情况
app.get('/repos/:repoName/languages', async (req, res) => {
  // 从 URL 参数中获取仓库名
  const { repoName } = req.params;

  // 简单的仓库名格式校验 (允许字母、数字、下划线、短横线、点)
  if (!/^[a-zA-Z0-9-_.]+$/.test(repoName)) {
    console.warn(`Invalid repository name format received: ${repoName}`);
    return res.status(400).json({ message: '无效的仓库名称格式' });
  }

  // 检查 Token 是否已配置
  if (!TOKEN) {
    console.error('Error: GITHUB_TOKEN environment variable is not set.');
    return res.status(500).json({ message: '服务器配置错误：缺少 GitHub 令牌。' });
  }

  try {
    console.log(`Workspaceing languages for repo: ${GITHUB_USERNAME}/${repoName}`);
    // 向 GitHub API 发送请求获取语言数据
    const langRes = await axios.get(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: {
          Authorization: `token ${TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    // 成功，返回获取到的语言数据
    res.json(langRes.data);
  } catch (e) {
    // 请求失败，记录错误日志
    console.error(`Failed to fetch languages for ${GITHUB_USERNAME}/${repoName}:`, e.message);
    // 特别处理 GitHub API 返回的 404 Not Found 错误
    if (e.response && e.response.status === 404) {
      console.log(`Repository or languages not found: ${GITHUB_USERNAME}/${repoName}`);
      return res.status(404).json({ message: `仓库 ${repoName} 或其语言信息未找到` });
    }
    // 其他错误按 500 内部服务器错误处理
    res.status(500).json({ message: '获取语言信息失败', error: e.message });
  }
});

// --- 路由定义结束 ---

// --- Vercel 适配 ---
// 导出 Express app 实例，Vercel 会自动处理请求
// 这是使用 @vercel/node 的推荐方式之一
export default app;

// 如果你喜欢明确导出 handler 函数，也可以用下面这种方式：
// export default function handler(req, res) {
//   app(req, res);
// };
// --- Vercel 适配结束 ---

// 注意：本地运行时，你可能需要添加监听端口的代码，但这在 Vercel 上不需要。
// 例如，本地运行可以添加：
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 3001;
//   app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
// }