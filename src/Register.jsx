import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from './api';
import { Form, Input, Button, Card, Typography, message, Spin, Layout } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password, confirmPassword } = values;
    
    if (password !== confirmPassword) {
      message.error('两次输入的密码不一致！');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await authApi.register(username, password);
      
      if (response.success) {
        console.log('注册成功:', response.data);
        message.success('注册成功，请登录');
        // 注册成功后跳转到登录页
        navigate('/login');
      } else {
        message.error(response.message || '注册失败');
      }
    } catch (err) {
      console.error('注册错误:', err);
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
            <div style={{ background: '#2196F3', padding: '40px 0', textAlign: 'center' }}>
              <UserAddOutlined style={{ fontSize: 64, color: 'white' }} />
              <Title level={2} style={{ color: 'white', marginTop: 16, marginBottom: 0 }}>
                用户注册
              </Title>
            </div>
          }
        >
          <Spin spinning={loading} tip="注册中...">
            <Form
              name="register"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              layout="vertical"
            >
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

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致!'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<SafetyOutlined />} 
                  placeholder="确认密码" 
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
                  注册
                </Button>
              </Form.Item>
            </Form>
            
            <div style={{ textAlign: 'center' }}>
              <Text>
                已有账号? <Link to="/login">返回登录</Link>
              </Text>
            </div>
          </Spin>
        </Card>
      </Content>
    </Layout>
  );
}

export default Register; 