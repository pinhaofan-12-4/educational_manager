import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './components/dashboard/StudentDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

function Dashboard() {
  const navigate = useNavigate();
  
  // 从localStorage或其他状态管理中获取用户信息
  const userRole = localStorage.getItem('userRole') || 'student';

  useEffect(() => {
    // 如果没有登录信息，重定向到登录页
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      console.log('没有登录信息，重定向到登录页');
      navigate('/login');
    }
  }, [navigate]);

  // 根据用户角色渲染对应的仪表盘
  const renderDashboard = () => {
    switch (userRole) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return renderDashboard();
}

export default Dashboard; 