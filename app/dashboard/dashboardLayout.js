'use client'

import { usePathname, useRouter } from "next/navigation";
import { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  UserOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Row, Col, Dropdown, Icon, Menu, DatePicker, Layout, Button, theme } from 'antd'
import UserNav from "@/components/userNav";
import { useSession } from "next-auth/react";

const { Header, Sider, Content } = Layout;

const routeTable = [
  ['1', "/dashboard"],
  ['2', "/dashboard/admin"]
]

const searchUrl = (key) => {
  return routeTable.filter(x => { return x[0] == key })[0][1]
}
const searchKey = (url) => {
  return routeTable.filter(x => { return x[1] == url })[0][0]
}
function getItem(label, key, icon, disabled = false) {
  return {
    key,
    icon,
    label,
    disabled
  };
}


export default function DashboardLayoutClient({ children, session: { user: { name: username } } }) {
  const path = usePathname()
  const items = [getItem('Home', '1', <HomeOutlined />)];
  // 判断是否是管理员
  if ("admin" === username) items.push(getItem('Administrator', '2', <UserOutlined />))

  const [current, setCurrent] = useState(searchKey(path));
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // console.log(colorBgContainer)

  const router = useRouter()

  const onClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
    router.push(searchUrl(e.key))
  };

  // console.log(items)

  return (
    <Layout hassidder="true" style={{ overflow: "hidden" }}>
      <Sider style={{
        minHeight: '100vh',
        overflow: 'hidden'
      }} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[current]}
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between"
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
            }}
          />
          {/* {JSON.stringify(session)} */}
          <UserNav username={username} />
        </Header>
        <Content
          style={{
            margin: '18px 16px',
            padding: '15px',
            overflow: 'auto',
            // background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}