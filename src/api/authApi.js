import { 
  delay, 
  generateId, 
  generateToken, 
  getMockUsers, 
  saveMockUsers, 
  formatResponse,
  STORAGE_KEYS
} from './mockUtils';

// 模拟登录API
export const login = async (username, password) => {
  // 模拟延迟，模拟网络请求
  await delay(700);
  
  try {
    // 获取已注册用户列表
    const users = getMockUsers();
    
    // 检查用户是否存在
    const user = users.find(u => u.username === username);
    
    if (!user) {
      return formatResponse(false, null, '用户不存在');
    }
    
    // 检查密码是否正确
    if (user.password !== password) {
      return formatResponse(false, null, '密码错误');
    }
    
    // 生成令牌
    const token = generateToken();
    
    // 存储登录状态
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
      id: user.id,
      username: user.username,
      // 不包含密码等敏感信息
    }));
    
    return formatResponse(true, {
      user: {
        id: user.id,
        username: user.username
      },
      token
    }, '登录成功');
  } catch (error) {
    console.error('登录出错:', error);
    return formatResponse(false, null, '登录失败，请稍后再试');
  }
};

// 模拟注册API
export const register = async (username, password) => {
  // 模拟延迟，模拟网络请求
  await delay(700);
  
  try {
    // 获取已注册用户列表
    const users = getMockUsers();
    
    // 检查用户名是否已存在
    if (users.some(u => u.username === username)) {
      return formatResponse(false, null, '用户名已被注册');
    }
    
    // 创建新用户
    const newUser = {
      id: generateId(),
      username,
      password,
      createdAt: new Date().toISOString()
    };
    
    // 将新用户添加到用户列表
    users.push(newUser);
    saveMockUsers(users);
    
    return formatResponse(true, {
      user: {
        id: newUser.id,
        username: newUser.username
      }
    }, '注册成功');
  } catch (error) {
    console.error('注册出错:', error);
    return formatResponse(false, null, '注册失败，请稍后再试');
  }
};

// 模拟退出登录API
export const logout = async () => {
  await delay(300);
  
  try {
    // 清除登录状态
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    
    return formatResponse(true, null, '已成功退出登录');
  } catch (error) {
    console.error('退出登录出错:', error);
    return formatResponse(false, null, '退出登录失败');
  }
};

// 获取当前用户信息
export const getCurrentUser = () => {
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userJson ? JSON.parse(userJson) : null;
};

// 检查是否已登录
export const isAuthenticated = () => {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
}; 