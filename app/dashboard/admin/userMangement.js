"use client"
import React, { useState } from 'react';
import { Form, Input, Button, Table, Space, Modal, message, Select } from 'antd';
import { userMgeAddAction, userMgeDeleteAction } from '../actions';

const { confirm } = Modal;

const level = [
    { value: 'A', label: '最高管理员' },
    { value: 'B', label: '数据管理员' },
    { value: 'C', label: '数据访客' },
    { value: 'D', label: '访客' }
]


const UserManagement = ({ initialList }) => {

    const [form] = Form.useForm();
    const [users, setUsers] = useState(initialList);

    const handleAddUser = () => {
        form.validateFields().then(values => {
            const newUser = {
                user: values.user,
                pass: values.pass,
                role: values.role
            };
            setUsers([...users, newUser]);
            form.resetFields();
        });
    };

    const handleDeleteUser = user => {
        return new Promise((res, rej) => confirm({
            title: '确认删除',
            content: `确定要删除用户 ${user.user} 吗？`,
            okText: '删除',
            cancelText: '取消',
            onOk: () => {
                const updatedUsers = users.filter(u => u.user !== user.user);
                setUsers(updatedUsers);
                res(true)
            },
            onCancel: () => res(false)
        }))

    };

    const __userMgeAddAction = async obj => {
        if (users.some(x => x.user == obj.user)) {
            message.error("用户已存在")
            return;
        }
        handleAddUser()
        await userMgeAddAction(obj)
    }

    const __userMgeDelAction = async obj => {
        if (await handleDeleteUser(obj))
            await userMgeDeleteAction(obj)
    }
    const columns = [
        { title: '用户名', dataIndex: 'user', key: 'user' },
        { title: '密码', dataIndex: 'pass', key: 'pass' },
        {
            title: '权限', dataIndex: 'role', key: 'role',
            render: obj => {
                return level.filter(x => x.value == obj)[0].label
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: obj => (
                <Space>
                    <Button danger onClick={() => __userMgeDelAction(obj)}>删除</Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Form form={form} onFinish={__userMgeAddAction} layout="inline" >
                <Form.Item name="user" label="用户名" rules={[{ required: true, message: 'Please input name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="pass" label="密码" rules={[{ required: true, message: 'Please input pass' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="权限" rules={[{ required: true, message: 'Please input role' }]}>
                    <Select
                        style={{ width: "8rem" }}
                        options={level}
                    />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" >添加用户</Button>
                </Form.Item>
            </Form>
            <br />
            <Table dataSource={users} columns={columns} />
        </div>
    );
};

export default UserManagement;