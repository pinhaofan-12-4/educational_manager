import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  Row,
  Col,
  List,
  Tag,
  Statistic,
  Space,
  Divider,
  Button,
  Table,
} from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  DatabaseOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import DashboardLayout from './DashboardLayout';

const { Title } = Typography;

function AdminDashboard() {
  const navigate = useNavigate();

  // 模拟系统数据
  const systemStats = {
    totalUsers: 1250,
    activeUsers: 980,
    totalCourses: 45,
    totalClasses: 68,
  };

  // 模拟用户统计数据
  const userStats = [
    { type: '学生', total: 1000, active: 800, inactive: 200 },
    { type: '教师', total: 200, active: 150, inactive: 50 },
    { type: '管理员', total: 50, active: 30, inactive: 20 },
  ];

  // 模拟最近活动数据
  const recentActivities = [
    { id: 1, type: '新用户注册', count: 25, status: 'success' },
    { id: 2, type: '新课程创建', count: 5, status: 'success' },
    { id: 3, type: '系统警告', count: 3, status: 'warning' },
    { id: 4, type: '系统错误', count: 1, status: 'error' },
  ];

  // 侧边栏菜单项
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '系统概览',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: '用户管理',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      key: 'security',
      icon: <SafetyCertificateOutlined />,
      label: '安全管理',
    },
  ];

  const handleLogout = () => {
    // 处理登出逻辑
    navigate('/login');
  };

  // 用户统计表格列定义
  const columns = [
    {
      title: '用户类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '总用户数',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '活跃用户',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: '非活跃用户',
      dataIndex: 'inactive',
      key: 'inactive',
    },
    {
      title: '活跃率',
      key: 'activeRate',
      render: (_, record) => `${Math.round((record.active / record.total) * 100)}%`,
    },
  ];

  return (
    <DashboardLayout
      menuItems={menuItems}
      username="管理员"
      role="系统管理员"
      siderLogo={<BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
      siderTitle="系统管理"
      onLogout={handleLogout}
    >
      <Title level={2}>系统管理概览</Title>
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={systemStats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={systemStats.activeUsers}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总课程数"
              value={systemStats.totalCourses}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总班级数"
              value={systemStats.totalClasses}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="用户统计" extra={<Button type="link">查看详情</Button>}>
            <Table 
              columns={columns} 
              dataSource={userStats}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="系统活动" extra={<Button type="link">查看全部</Button>}>
            <List
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item
                  extra={
                    <Tag color={
                      item.status === 'success' ? 'success' : 
                      item.status === 'warning' ? 'warning' : 
                      'error'
                    }>
                      {item.count}
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    title={item.type}
                    description={`最近24小时内`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default AdminDashboard; 