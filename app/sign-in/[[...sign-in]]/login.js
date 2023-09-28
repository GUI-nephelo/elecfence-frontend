
import { Form, Input, Button, Row, Col, Card,Alert } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import { useSearchParams,redirect } from 'next/navigation'
import { getCurrentSession } from "@/lib/session";


export default function Login({query}){
  const searchParams = useSearchParams()
  const callbackUrl = searchParams["callbackUrl"]||"/"
const router=useRouter()
  

  const [isVisible, setIsVisible] = useState(false);

  const onFinish = async ({ username, password}) => {

    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
      callbackUrl:callbackUrl
    });

    console.log(result)
    setIsVisible(!result.ok)
    if(result.ok) router.push(callbackUrl)
  };


  return (
    // 创建一个包含登录界面的行，使其在页面中垂直居中
    <Row
      justify="center"
      align="middle"
      style={{minHeight:"100vh", backgroundColor: "#f0f4f8" }}
    >
      <Col xs={20} sm={16} md={12} lg={8}>
        {/* 使用卡片容器来包裹登录表单 */}
        <Card>
          {/* 展示欢迎标题 */}
          <h1 style={{ textAlign: "center", marginBottom: 20 }}>
            欢迎来到电子围栏数据查询系统
          </h1>
          {/* 创建登录表单 */}
          <Form name="login" id="form" onFinish={onFinish}>
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
            {isVisible &&
            <>
            <Alert message="用户或密码错误" type="error" showIcon />
            <br/>
            </>
            }
            
            
            

            {/* 登录按钮 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
          {/* 显示“创建账号”的链接 */}
          <div style={{ textAlign: "center" }}>
            <p>
              没有账户？请联系管理员
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

