import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Typography, 
  Button, 
  Space, 
  Avatar, 
  Menu, 
  Dropdown,
  message,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function DashboardLayout({ 
  children, 
  menuItems, 
  username, 
  role,
  siderLogo,
  siderTitle,
  onLogout 
}) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除所有用户相关的localStorage数据
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    
    message.success('已安全退出');
    navigate('/login');
  };

  const userMenu = {
    items: [
      {
        key: '1',
        label: '个人资料',
        icon: <UserOutlined />,
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: '退出登录',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
        danger: true,
      },
    ],
  };

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
          {siderLogo}
          {!collapsed && <Title level={4} style={{ margin: '0 0 0 12px' }}>{siderTitle}</Title>}
        </div>
        <Menu 
          theme="light" 
          defaultSelectedKeys={['dashboard']} 
          mode="inline" 
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header 
          style={{ 
            height: '64px',
            lineHeight: '64px',
            padding: '0 16px', 
            background: '#fff', 
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%'
          }}
        >
          <Button 
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              fontSize: '16px',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
          <Dropdown menu={userMenu} placement="bottomRight">
            <Space align="center" style={{ cursor: 'pointer', height: '64px', padding: '0 8px' }}>
              <Avatar size={32} style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                height: '100%'
              }}>
                <Text strong style={{ 
                  marginBottom: '-4px',
                  fontSize: '14px',
                  lineHeight: '20px'
                }}>{username}</Text>
                <Text type="secondary" style={{ 
                  fontSize: '12px',
                  lineHeight: '16px'
                }}>{role}</Text>
              </div>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 4 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout; 