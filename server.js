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


// 在你的 server.js 文件中添加
app.get('/test', (req, res) => {
  res.send('Hello from /test!');
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