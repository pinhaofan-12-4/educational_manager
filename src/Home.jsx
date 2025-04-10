import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from './api';
import { Layout, Typography, Button, Card, Row, Col, Space, Avatar } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined, 
  LoginOutlined, 
  UserAddOutlined,
  BookOutlined,
  RocketOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 获取当前用户信息
    const currentUser = authApi.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await authApi.logout();
      if (response.success) {
        // 清除用户信息
        setUser(null);
        // 跳转到登录页
        navigate('/login');
      }
    } catch (error) {
      console.error('退出登录错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  // 特性数据
  const features = [
    {
      title: '进度追踪',
      description: '实时记录和展示您的学习进度，帮助您保持动力和专注力。',
      icon: <RocketOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
    },
    {
      title: '任务管理',
      description: '创建和管理学习任务，设置截止日期，确保按时完成学习目标。',
      icon: <ScheduleOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
    },
    {
      title: '资源收集',
      description: '整理和归类学习资源，随时随地访问您需要的学习材料。',
      icon: <BookOutlined style={{ fontSize: 36, color: '#fa8c16' }} />,
    },
  ];

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ 
        position: 'fixed', 
        zIndex: 1, 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 50px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BookOutlined style={{ fontSize: 24, color: 'white', marginRight: 8 }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>学习管理系统</Title>
        </div>
        
        {user ? (
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Text style={{ color: 'white' }}>{user.username}</Text>
            <Button type="primary" icon={<DashboardOutlined />} onClick={handleDashboard}>
              进入仪表盘
            </Button>
            <Button danger onClick={handleLogout} loading={loading}>
              退出登录
            </Button>
          </Space>
        ) : (
          <Space>
            <Button 
              type="primary" 
              icon={<LoginOutlined />}
              href="/login"
            >
              登录
            </Button>
            <Button 
              icon={<UserAddOutlined />}
              href="/register"
            >
              注册
            </Button>
          </Space>
        )}
      </Header>
      
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ 
          height: '500px', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, #1890ff 0%, #52c41a 100%)',
          color: 'white',
          padding: '0 20px'
        }}>
          <Title style={{ color: 'white' }}>提升学习效率的最佳助手</Title>
          <Paragraph style={{ fontSize: 18, color: 'white', maxWidth: 600, margin: '20px 0 40px' }}>
            学习管理系统帮助您规划学习路径、跟踪进度、管理学习资源，让您的学习更加高效和有条理。
          </Paragraph>
          
          {user ? (
            <Button 
              type="primary" 
              size="large" 
              icon={<DashboardOutlined />}
              onClick={handleDashboard}
              style={{ background: 'white', color: '#1890ff' }}
            >
              进入仪表盘
            </Button>
          ) : (
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<LoginOutlined />}
                href="/login"
                style={{ background: 'white', color: '#1890ff' }}
              >
                立即登录
              </Button>
              <Button 
                size="large" 
                icon={<UserAddOutlined />}
                href="/register"
                style={{ borderColor: 'white', color: 'white' }}
              >
                免费注册
              </Button>
            </Space>
          )}
        </div>
        
        <div style={{ padding: '50px 0' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>
            主要功能
          </Title>
          
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={24} md={8} key={index}>
                <Card 
                  hoverable 
                  style={{ textAlign: 'center', height: '100%' }}
                  cover={
                    <div style={{ padding: '30px 0' }}>
                      {feature.icon}
                    </div>
                  }
                >
                  <Card.Meta
                    title={<Title level={4}>{feature.title}</Title>}
                    description={<Paragraph>{feature.description}</Paragraph>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        学习管理系统 ©{new Date().getFullYear()} - 让学习更简单，更高效
      </Footer>
    </Layout>
  );
}

export default Home; 