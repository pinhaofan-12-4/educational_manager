// 模拟延迟函数
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// 本地存储键
export const STORAGE_KEYS = {
  USERS: 'mock_users',
  CURRENT_USER: 'current_user',
  TOKEN: 'token'
};

// 生成唯一ID
export const generateId = () => Math.random().toString(36).substring(2, 9);

// 生成模拟令牌
export const generateToken = () => {
  return `mock_token_${Math.random().toString(36).substring(2, 15)}`;
};

// 初始化本地存储的用户列表
export const initMockUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!users) {
    // 如果没有用户列表，创建一个初始列表
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
};

// 获取用户列表
export const getMockUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

// 保存用户列表
export const saveMockUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// 响应格式化
export const formatResponse = (success, data = null, message = '') => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };
};

// 初始化模拟数据
export const initMockData = () => {
  initMockUsers();
}; 