import React from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    // 创建一个包含登录界面的行，使其在页面中垂直居中
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", backgroundColor: "#f0f4f8" }}
    >
      <Col xs={20} sm={16} md={12} lg={8}>
        {/* 使用卡片容器来包裹登录表单 */}
        <Card>
          {/* 展示欢迎标题 */}
          <h1 style={{ textAlign: "center", marginBottom: 20 }}>
            Welcome to Our App
          </h1>
          {/* 创建登录表单 */}
          <Form name="login" onFinish={onFinish}>
            {/* 用户名输入框 */}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            {/* 密码输入框 */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {/* 登录按钮 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          {/* 显示“创建账号”的链接 */}
          <div style={{ textAlign: "center" }}>
            <p>
              Don&apos;t have an account? <a href="#">Create one&rsquo;squo;</a>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
