// api/all-repos-with-langs.ts

import { getAllReposWithLangs } from '../services/githubService';

console.log('Request Headers:');
export default async function handler(req: any, res: any) {
  try {
    // 设置 CORS（可选）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    const data = await getAllReposWithLangs();
    res.status(200).json(data);
  } catch (e: any) {
    console.error('Serverless Error:', e.message);
    res.status(500).json({ error: e.message });
  }
}