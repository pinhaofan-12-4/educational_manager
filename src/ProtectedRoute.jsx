import { Navigate } from 'react-router-dom';
import { authApi } from './api';

function ProtectedRoute({ children }) {
  const isAuthenticated = authApi.isAuthenticated();
  
  if (!isAuthenticated) {
    // 如果未登录，重定向到登录页
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute; 