import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from './api';
import { Form, Input, Button, Card, Typography, message, Spin, Layout, Radio } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password, role } = values;
    setLoading(true);
    
    try {
      // 调用真实登录API，并传递角色参数
      const response = await authApi.login(username, password, role);
      
      if (response.success) {
        // 登录API会自动设置角色信息，不需要手动设置
        message.success('登录成功');
        // 跳转到仪表盘
        navigate('/dashboard');
      } else {
        message.error(response.message || '登录失败');
      }
    } catch (err) {
      console.error('登录错误:', err);
      message.error('网络错误，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          style={{ width: 400, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}
          cover={
            <div style={{ background: '#1890ff', padding: '40px 0', textAlign: 'center' }}>
              <LoginOutlined style={{ fontSize: 64, color: 'white' }} />
              <Title level={2} style={{ color: 'white', marginTop: 16, marginBottom: 0 }}>
                用户登录
              </Title>
            </div>
          }
        >
          <Spin spinning={loading} tip="登录中...">
            <Form
              name="login"
              initialValues={{ role: 'student' }}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="role"
                rules={[{ required: true, message: '请选择角色!' }]}
              >
                <Radio.Group size="large" buttonStyle="solid" style={{ width: '100%', textAlign: 'center' }}>
                  <Radio.Button value="student">学生</Radio.Button>
                  <Radio.Button value="teacher">教师</Radio.Button>
                  <Radio.Button value="admin">管理员</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="用户名" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="密码" 
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
            
            <div style={{ textAlign: 'center' }}>
              <Text>
                还没有账号? <Link to="/register">立即注册</Link>
              </Text>
            </div>
          </Spin>
        </Card>
      </Content>
    </Layout>
  );
}

export default Login; 