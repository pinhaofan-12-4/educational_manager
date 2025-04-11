import api from './axios';
import { 
  delay, 
  generateId, 
  generateToken, 
  getMockUsers, 
  saveMockUsers, 
  formatResponse,
  STORAGE_KEYS
} from './mockUtils';

// 真实登录API
export const login = async (username, password, role) => {
  try {
    // 调用真实的后端API，添加role参数
    const response = await api.post('/api/accounts/login', {
      username,
      password,
      role
    });
    
    // 假设后端返回的数据格式为 { success: true, data: { user, token }, message: '...' }
    if (response.success) {
      // 保存令牌和用户信息到本地存储
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(response.data.user));
      localStorage.setItem('userRole', response.data.user.role || role);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    return response;
  } catch (error) {
    console.error('登录出错:', error);
    // 如果API调用失败，返回错误信息
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || '登录失败，请稍后再试'
    };
  }
};

// 真实注册API
export const register = async (username, password, role) => {
  try {
    // 调用真实的后端API，添加role参数
    const response = await api.post('/api/accounts/register', {
      username,
      password,
      role
    });
    
    return response;
  } catch (error) {
    console.error('注册出错:', error);
    // 如果API调用失败，返回错误信息
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || '注册失败，请稍后再试'
    };
  }
};

// 模拟退出登录API (可以在后续更新为真实API)
export const logout = async () => {
  await delay(300);
  
  try {
    // 清除登录状态
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    
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