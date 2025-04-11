import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from './api';
import { Form, Input, Button, Card, Typography, message, Spin, Layout, Radio } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password, confirmPassword, role } = values;
    
    // 检查密码是否匹配
    if (password !== confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    
    setLoading(true);
    
    try {
      // 调用注册API，并传递角色参数
      const response = await authApi.register(username, password, role);
      
      if (response.success) {
        message.success('注册成功，请登录');
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
            <div style={{ background: '#52c41a', padding: '40px 0', textAlign: 'center' }}>
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
                rules={[
                  { required: true, message: '请输入用户名!' },
                  { min: 3, message: '用户名至少3个字符' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="用户名" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: '请输入密码!' },
                  { min: 6, message: '密码至少6个字符' }
                ]}
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
                  prefix={<LockOutlined />} 
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
                已有账号? <Link to="/login">立即登录</Link>
              </Text>
            </div>
          </Spin>
        </Card>
      </Content>
    </Layout>
  );
}

export default Register; 