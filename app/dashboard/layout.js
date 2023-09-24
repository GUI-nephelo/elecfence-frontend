'use client'
// import './globals.css'
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
import { useState } from 'react';

import { useRouter } from 'next/router';
import { usePathname } from "next/navigation"

const { Header, Sider, Content } = Layout;



function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const routeTable = [
  ['1',"/dashboard"],
  ['2',"/dashboard/admin"]
]

const searchUrl = (key) => {
  return routeTable.filter(x=>{return x[0]==key})[0][1]
}

const searchKey = (url) => {
  return routeTable.filter(x=>{return x[1]==url})[0][0]
}

export default function RootLayout({ children }) {

  // const router = useRouter()
  const path = usePathname()
  const items = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Administrator', '2', <UserOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),
    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Option 7', '7'),
    //   getItem('Option 8', '8'),
    // ]),
    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //   getItem('Option 9', '9'),
    //   getItem('Option 10', '10'),
    //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    // ]),
  ];
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState(searchKey(path));

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    document.location = searchUrl(e.key)
  };

  return (
    <Layout hassidder="true" style={{ overflow: "hidden" }}>
      <Sider style={{
        minHeight: '100vh',
        overflow: 'hidden'
      }} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            overflow: 'auto',
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
