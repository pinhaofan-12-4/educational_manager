import axios from 'axios';

// 创建axios实例
const api = axios.create({
  // 使用相对路径，会被Vite代理处理
  baseURL: '/api',
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
    // 如果响应正常，直接返回数据
    return response.data;
  },
  error => {
    // 根据错误状态码进行不同处理
    if (error.response) {
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