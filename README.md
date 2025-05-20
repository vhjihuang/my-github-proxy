# My GitHub Proxy

一个用于获取 GitHub 用户仓库及其语言数据的代理服务。

## 功能

- 获取指定 GitHub 用户的所有仓库信息。
- 获取每个仓库的语言使用情况。
- 支持缓存以提高性能。

## 项目结构

## 环境变量

在项目根目录下创建 `.env` 文件，并添加以下内容：

- `GITHUB_TOKEN`：您的 GitHub 个人访问令牌，用于访问 GitHub API。

## 安装依赖

使用以下命令安装项目依赖：

```bash
pnpm install
```

启动项目
运行以下命令启动项目：
```bash
pnpm start
```

API 说明
获取所有仓库及语言数据
Endpoint: `/api/repos`

方法: GET

响应:
```bash
[
  {
    "id": 123456,
    "title": "example-repo",
    "description": "示例仓库",
    "cloneUrl": "https://github.com/vhjihuang/example-repo.git",
    "repoUrl": "https://github.com/vhjihuang/example-repo",
    "stars": 10,
    "forks": 2,
    "updated_at": "2023年10月1日",
    "languages": [
      {
        "name": "JavaScript",
        "percentage": 75.5
      },
      {
        "name": "HTML",
        "percentage": 24.5
      }
    ]
  }
]
```

技术栈
Node.js: 后端运行时。
TypeScript: 静态类型检查。
Express: Web 框架。
Axios: HTTP 请求库。
Vercel: 部署平台。
开发指南
代码格式化
运行以下命令格式化代码：
```bash
pnpm format
```

运行测试
运行以下命令执行单元测试：

部署
项目已配置 vercel.json，可直接部署到 Vercel。

贡献
欢迎提交 Issue 或 Pull Request 来贡献代码。

许可证
本项目基于 [MIT License](LICENSE) 开源
