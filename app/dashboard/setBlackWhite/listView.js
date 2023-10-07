"use client"
import { Button, Col, Form, Input, List, Row, Space } from "antd";
import "./list.css"
import { useState } from "react";


function ListView({ name, label, action, handleAdd, dataSource, handleDelete }) {
    return (
        <List
            size="large"
            className="min-width-list"
            header={<h1>{label}</h1>}
            footer={<InputNumForm {...{ name, label, action, handleAdd }} />}
            dataSource={dataSource}
            bordered
            renderItem={item => (
                <List.Item>
                    <p>{item}</p>
                    <Button type="link" onClick={() => handleDelete(item, name)}>删除</Button>
                </List.Item>
            )}
        />
    )
}

function InputNumForm({ name, label, action, handleAdd }) {
    const [value, setValue] = useState("")
    // 只允许输入数字字符
    const onChange = e => {
        if (!isNaN(Number(e.target.value))) setValue(e.target.value)
    }
    return (
        <Form action={action} onFinish={(obj) => { handleAdd(obj, name) }}>
            <Form.Item name={name} rules={[{ required: true, message: '请输入电话号' }]}>
                <Space.Compact>
                    <Input placeholder={`添加${label}`} value={value} onChange={onChange} />
                    <Button type="primary" htmlType="submit" onClick={() => setValue("")}>提交</Button>
                </Space.Compact>
            </Form.Item>
        </Form>
    )
}

export function BlackWhiteListView() {
    const [list, setList] = useState({ whiteList: [], blackList: [] })

    const handleAdd = (e, key) => {
        setList(prevList => {
            return { ...prevList, [key]: [...prevList[key], e[key]] };
        });
        // TODO: 在数据库添加
    };
    const handleDelete = (item, key) => {
        setList(prevList => ({
            ...prevList,
            [key]: prevList[key].filter(entry => entry !== item)
        }));
        // TODO: 在数据库删除 
    };
    console.log("view")
    return (
        <Row justify="space-around" wrap={true}>
            <Col span={9}>
                <ListView
                    name={"blackList"}
                    label={"黑名单"}
                    dataSource={list.blackList}
                    // handleDelete={handleDelete}
                    // handleAdd={handleAdd}
                    {...{ handleAdd, handleDelete }}
                />
            </Col>
            <Col span={9}>
                <ListView
                    name={"whiteList"}
                    label={"白名单"}
                    dataSource={list.whiteList}
                    // handleDelete={handleDelete}
                    // handleAdd={handleAdd}
                    {...{ handleAdd, handleDelete }}
                />
            </Col>
        </Row>
    )
}