import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from './api';
import { 
  Layout, 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Avatar, 
  Progress, 
  List, 
  Tag, 
  Statistic, 
  Space, 
  Divider, 
  Menu, 
  Dropdown
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LinkOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text, Link: AntLink } = Typography;

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 获取当前用户信息
    const currentUser = authApi.getCurrentUser();
    
    // 如果没有登录，重定向到登录页
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
  }, [navigate]);

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

  // 模拟任务数据
  const tasks = [
    { id: 1, name: 'React基础学习', date: '2023-05-01', completed: true },
    { id: 2, name: 'Redux状态管理', date: '2023-05-03', completed: true },
    { id: 3, name: 'React Router路由', date: '2023-05-05', completed: false },
    { id: 4, name: 'API集成与后端交互', date: '2023-05-07', completed: false },
  ];

  // 模拟资源数据
  const resources = [
    { id: 1, name: 'React官方文档', link: 'https://react.dev' },
    { id: 2, name: 'JavaScript高级教程', link: 'https://javascript.info' },
    { id: 3, name: 'CSS布局技巧', link: 'https://css-tricks.com' },
    { id: 4, name: 'Web开发最佳实践', link: 'https://web.dev' },
  ];

  // 侧边栏菜单项
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'tasks',
      icon: <CheckCircleOutlined />,
      label: '任务管理',
    },
    {
      key: 'resources',
      icon: <FileTextOutlined />,
      label: '学习资源',
    },
    {
      key: 'calendar',
      icon: <CalendarOutlined />,
      label: '日程安排',
    },
  ];

  const userMenu = {
    items: [
      {
        key: '1',
        label: '个人资料',
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: '设置',
        icon: <UserOutlined />,
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: '退出登录',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
        danger: true,
      },
    ],
  };

  if (!user) {
    return null; // 或者显示加载中状态
  }

  // 计算完成的任务数量和百分比
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '16px' 
        }}>
          <BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />
          {!collapsed && <Title level={4} style={{ margin: '0 0 0 12px' }}>学习管理</Title>}
        </div>
        <Menu 
          theme="light" 
          defaultSelectedKeys={['dashboard']} 
          mode="inline" 
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff', 
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button 
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Dropdown menu={userMenu} placement="bottomRight" disabled={loading}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
              <Text strong>{user.username}</Text>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 4 }}>
          <Title level={2}>欢迎来到你的学习仪表盘</Title>
          <Divider />
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card title="学习进度" bordered={false}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <Progress 
                    type="circle" 
                    percent={progressPercent} 
                    format={(percent) => `${percent}%`} 
                  />
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic 
                        title="已完成" 
                        value={completedTasks} 
                        suffix={`/ ${totalTasks}`} 
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic 
                        title="剩余任务" 
                        value={totalTasks - completedTasks} 
                      />
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Card title="最近任务" bordered={false} extra={<Button type="link">查看全部</Button>}>
                <List
                  itemLayout="horizontal"
                  dataSource={tasks}
                  renderItem={(task) => (
                    <List.Item
                      actions={[
                        task.completed ? 
                          <Tag color="success" icon={<CheckCircleOutlined />}>已完成</Tag> : 
                          <Tag color="processing" icon={<ClockCircleOutlined />}>进行中</Tag>
                      ]}
                    >
                      <List.Item.Meta
                        title={<Text delete={task.completed}>{task.name}</Text>}
                        description={`计划完成日期: ${task.date}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          
          <Divider />
          
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="学习资源" bordered={false} extra={<Button type="link">添加资源</Button>}>
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                  }}
                  dataSource={resources}
                  renderItem={(resource) => (
                    <List.Item>
                      <Card hoverable>
                        <Card.Meta
                          avatar={<LinkOutlined />}
                          title={<AntLink href={resource.link} target="_blank">{resource.name}</AntLink>}
                          description="点击标题访问资源"
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard; 