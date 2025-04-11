import axios from 'axios';

// 创建axios实例
const api = axios.create({
  // 在开发环境中使用相对路径
  baseURL: 'http://localhost:8080',  // 空字符串让请求发送到当前域名
  timeout: 5000,  // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 从localStorage获取token并添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 打印请求信息，帮助调试
    console.log('发送请求:', config.method.toUpperCase(), config.url, config.data);
    
    return config;
  },
  error => {
    // 请求错误处理
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 打印响应数据，帮助调试
    console.log('收到响应:', response.config.url, response.data);
    
    // 如果响应正常，直接返回数据
    return response.data;
  },
  error => {
    // 打印错误信息，帮助调试
    console.error('请求失败:', error.config?.url, error.message);
    
    // 根据错误状态码进行不同处理
    if (error.response) {
      console.error('错误响应状态:', error.response.status);
      console.error('错误响应数据:', error.response.data);
      
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并重定向到登录页
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error(`其他错误，状态码: ${error.response.status}`);
      }
    } else {
      console.error('网络错误，请检查您的网络连接');
    }
    return Promise.reject(error);
  }
);

export default api; 