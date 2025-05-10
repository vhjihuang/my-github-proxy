import axios from "axios";
import { getCache, setCache } from "../utils/cacheUtils";

const GITHUB_USERNAME = "vhjihuang"; // 替换为你的 GitHub 用户名
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = "https://api.github.com";

/**
 * 获取所有仓库 + 对应的语言数据
 */
export const getAllReposWithLangs = async () => {
  // 检查缓存
  const cached = getCache();
  if (cached) return cached;

  // 获取仓库列表
  const reposRes = await axios.get(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const repos = reposRes.data;

  // 并发获取语言信息
  const langPromises = repos.map((repo: any) =>
    axios.get(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repo.name}/languages`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
  );

  const langsResponses = await Promise.all(langPromises);
  const langsData = langsResponses.map((r) => r.data);

  // 合并数据
  const result = repos.map((repo: any, i: number) => {
    const langData = langsData[i] as Record<string, number>;
    const totalBytes = Object.values(langData).reduce((sum: number, bytes: any) => sum + bytes, 0);
    return {
      id: repo.id,
      title: repo.name,
      description: repo.description || "暂无描述",
      cloneUrl: repo.clone_url,
      repoUrl: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      languages: Object.entries(langData).map(([lang, bytes]) => ({
        name: lang,
        percentage: parseFloat(((bytes / totalBytes) * 100).toFixed(1)),
      })),
    };
  });

  // 设置缓存
  setCache(result);

  return result;
};
