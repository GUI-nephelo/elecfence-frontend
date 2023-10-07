"use client"
import React, { useState } from 'react';
import { Form, Input, Button, Table, Space, Modal } from 'antd';
import { userMgeAction } from '../actions';

const { confirm } = Modal;

const UserManagement = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);

    const handleAddUser = () => {
        form.validateFields().then(values => {
            const newUser = {
                id: Date.now(),
                name: values.name,
                email: values.email,
            };
            setUsers([...users, newUser]);
            form.resetFields();
        });
    };

    const handleDeleteUser = user => {
        confirm({
            title: '确认删除',
            content: `确定要删除用户 ${user.name} 吗？`,
            okText: '删除',
            cancelText: '取消',
            onOk: () => {
                const updatedUsers = users.filter(u => u.id !== user.id);
                setUsers(updatedUsers);
            },
        });
    };



    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Action',
            key: 'action',
            render: (_, user) => (
                <Space>
                    <Button danger onClick={() => handleDeleteUser(user)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Form form={form} action={userMgeAction} onFinish={userMgeAction} layout="inline">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    {/* <Button type="primary" onClick={handleAddUser}>添加用户</Button> */}
                    <Button type="primary" htmlType="submit">添加用户</Button>
                </Form.Item>
            </Form>
            <br />
            <Table dataSource={users} columns={columns} />
        </div>
    );
};

export default UserManagement;