"use client"
import { Button, Col, Form, Input, List, Row, Space } from "antd";
import "./list.css"
import { useState } from "react";
import { BlackWhiteAddAction, BlackWhiteDeleteAction } from "../actions";
import { useRouter } from "next/navigation";
import { compareSync } from "bcryptjs";


function ListView({ name, label, handleAdd, dataSource, handleDelete }) {
    const __handleDelete = async item => {
        await handleDelete(item, name)
    }
    return (
        <List
            size="large"
            className="min-width-list"
            header={<h1>{label}:手机号</h1>}
            footer={<InputNumForm {...{ name, label, handleAdd }} />}
            dataSource={dataSource}
            bordered
            renderItem={item => (
                <List.Item>
                    <p>{item}</p>
                    <Button type="link" onClick={async () => await __handleDelete(item)}>删除</Button>
                </List.Item>
            )}
        />
    )
}

function InputNumForm({ name, label, handleAdd }) {
    const [value, setValue] = useState("")
    // 只允许输入数字字符
    const onChange = e => {
        if (!isNaN(Number(e.target.value))) setValue(e.target.value)
    }

    const __handleAdd = async (obj) => {
        setValue("");
        await handleAdd(obj, name);
    }
    return (
        <Form onFinish={__handleAdd}>
            <Form.Item name={name} rules={[{ required: true, message: '请输入电话号' }]}>
                <Space.Compact>
                    <Input placeholder={`添加${label}`} {...{ value, onChange }} />
                    <Button type="primary" htmlType="submit">提交</Button>
                </Space.Compact>
            </Form.Item>
        </Form>
    )
}

export function BlackWhiteListView({ initialList }) {
    console.log(initialList)

    const router = useRouter()
    const [list, setList] = useState(/*{ whiteList: [], blackList: [] }*/initialList)

    const handleAdd = async (e, key) => {
        if (list[key].includes(e[key])) return

        setList(prevList => {
            return {
                ...prevList,
                [key]: [...prevList[key], e[key]]
            };
        });

        await BlackWhiteAddAction({ ...e, key });
        // router.refresh()
        // console.log(list)
    };
    const handleDelete = async (blackList, key) => {
        // if (!(list[key].includes(blackList[key]))) return;
        setList(prevList => ({
            ...prevList,
            [key]: prevList[key].filter(entry => entry !== blackList)
        }));
        await BlackWhiteDeleteAction({ blackList, key })
        // router.refresh()
    };
    // console.log("view")
    return (
        <Row justify="space-around" wrap={true}>
            <Col span={9}>
                <ListView
                    name={"blackList"}
                    label={"黑名单"}
                    dataSource={list.blackList}
                    {...{ handleAdd, handleDelete }}
                />
            </Col>
            <Col span={9}>
                <ListView
                    name={"whiteList"}
                    label={"白名单"}
                    dataSource={list.whiteList}
                    {...{ handleAdd, handleDelete }}
                />
            </Col>
        </Row>
    )
}