import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  Row,
  Col,
  Progress,
  List,
  Tag,
  Statistic,
  Space,
  Divider,
  Button,
} from 'antd';
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import DashboardLayout from './DashboardLayout';

const { Title, Text } = Typography;

function StudentDashboard() {
  const navigate = useNavigate();

  // 模拟任务数据
  const tasks = [
    { id: 1, name: 'React基础学习', date: '2023-05-01', completed: true },
    { id: 2, name: 'Redux状态管理', date: '2023-05-03', completed: true },
    { id: 3, name: 'React Router路由', date: '2023-05-05', completed: false },
    { id: 4, name: 'API集成与后端交互', date: '2023-05-07', completed: false },
  ];

  // 侧边栏菜单项
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '学习概览',
    },
    {
      key: 'tasks',
      icon: <CheckCircleOutlined />,
      label: '我的作业',
    },
    {
      key: 'resources',
      icon: <FileTextOutlined />,
      label: '学习资源',
    },
    {
      key: 'calendar',
      icon: <CalendarOutlined />,
      label: '课程表',
    },
  ];

  const handleLogout = () => {
    // 处理登出逻辑
    navigate('/login');
  };

  // 计算完成的任务数量和百分比
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <DashboardLayout
      menuItems={menuItems}
      username="张三"
      role="学生"
      siderLogo={<BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
      siderTitle="学习管理"
      onLogout={handleLogout}
    >
      <Title level={2}>我的学习概览</Title>
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
                    title="已完成作业" 
                    value={completedTasks} 
                    suffix={`/ ${totalTasks}`} 
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="待完成作业" 
                    value={totalTasks - completedTasks} 
                  />
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Card title="最近作业" bordered={false} extra={<Button type="link">查看全部</Button>}>
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
                    description={`截止日期: ${task.date}`}
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

export default StudentDashboard; 