let cachedData: any = null;
let cacheTime: number | null = null;

const CACHE_TTL = 6 * 60 * 60 * 1000; // 缓存 6 小时

export const getCache = () => {
  if (!cachedData || !cacheTime || Date.now() - cacheTime > CACHE_TTL) {
    return null;
  }
  return cachedData;
};

export const setCache = (data: any) => {
  cachedData = data;
  cacheTime = Date.now();
};