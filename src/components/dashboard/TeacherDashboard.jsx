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
  Avatar,
} from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import DashboardLayout from './DashboardLayout';

const { Title, Text } = Typography;

function TeacherDashboard() {
  const navigate = useNavigate();

  // 模拟班级数据
  const classes = [
    { id: 1, name: 'Web开发基础班', studentCount: 30, activeCount: 28 },
    { id: 2, name: 'React进阶班', studentCount: 25, activeCount: 23 },
    { id: 3, name: '全栈开发实战班', studentCount: 20, activeCount: 19 },
  ];

  // 模拟作业数据
  const assignments = [
    { id: 1, name: 'React组件开发', class: 'React进阶班', dueDate: '2023-05-10', submittedCount: 20, totalCount: 25 },
    { id: 2, name: 'HTML基础练习', class: 'Web开发基础班', dueDate: '2023-05-08', submittedCount: 28, totalCount: 30 },
    { id: 3, name: '项目实战作业', class: '全栈开发实战班', dueDate: '2023-05-12', submittedCount: 15, totalCount: 20 },
  ];

  // 侧边栏菜单项
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '教学概览',
    },
    {
      key: 'classes',
      icon: <TeamOutlined />,
      label: '班级管理',
    },
    {
      key: 'assignments',
      icon: <FileTextOutlined />,
      label: '作业管理',
    },
    {
      key: 'calendar',
      icon: <CalendarOutlined />,
      label: '课程安排',
    },
  ];

  const handleLogout = () => {
    // 处理登出逻辑
    navigate('/login');
  };

  // 计算总体统计数据
  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const totalActiveStudents = classes.reduce((sum, c) => sum + c.activeCount, 0);
  const activeRate = Math.round((totalActiveStudents / totalStudents) * 100);

  return (
    <DashboardLayout
      menuItems={menuItems}
      username="李老师"
      role="教师"
      siderLogo={<BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
      siderTitle="教学管理"
      onLogout={handleLogout}
    >
      <Title level={2}>教学管理概览</Title>
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="总学生数"
              value={totalStudents}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="活跃学生"
              value={totalActiveStudents}
              suffix={`/ ${totalStudents}`}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card>
            <Statistic
              title="活跃率"
              value={activeRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} md={12}>
          <Card title="班级管理" extra={<Button type="link">管理班级</Button>}>
            <List
              dataSource={classes}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="link">查看详情</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<TeamOutlined />} />}
                    title={item.name}
                    description={`学生数: ${item.activeCount}/${item.studentCount}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card title="作业完成情况" extra={<Button type="link">布置作业</Button>}>
            <List
              dataSource={assignments}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tag color="processing" icon={<ClockCircleOutlined />}>
                      截止日期: {item.dueDate}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={
                      <Space direction="vertical">
                        <Text>班级: {item.class}</Text>
                        <Text>提交情况: {item.submittedCount}/{item.totalCount}</Text>
                      </Space>
                    }
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

export default TeacherDashboard; 