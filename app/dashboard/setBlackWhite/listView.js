"use client"
import { Button, Col, Form, Input, List, Row, Space, Upload, message } from "antd";
import { useState } from "react";
import { BlackWhiteAddAction, BlackWhiteDeleteAction } from "../actions";
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

function FileImportForm({ name, label, handleAdd }) {


    function xlsx2json(file, type = "buffer") {

        const workbook = XLSX.read(file, { type: type });
        // console.log(workbook)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // console.log(worksheet)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(jsonData)
        // 获取数据 处理类型
        const data = jsonData.map(x => `${x[0]}`).filter(v => !isNaN(v))
        console.log('JSON data:', data);
        return data
    }

    const onUpload = async (file) =>
        new Promise((res, rej) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                // console.log(e)
                const data = xlsx2json(e.target.result)
                if (data.length) {
                    handleAdd({ [name]: data }, name).then(o => {
                        message.success(`读取${label}成功`);
                        res(false);
                    }).catch((error) => {
                        message.success(`读取${label}失败: ${error}`);
                        rej("读取失败");
                    })
                } else {
                    message.success(`读取${label}失败，无数据`)
                    rej("无数据")
                }
            }
            reader.readAsArrayBuffer(file)
        })


    return (
        <Upload accept=".xlsx,.xls" beforeUpload={onUpload}>
            <Button icon={<UploadOutlined />}>导入{label}</Button>
        </Upload>
    )
}



function ListView({ name, label, handleAdd, dataSource, handleDelete }) {
    const __handleDelete = async item => {
        await handleDelete(item, name)
    }
    return (
        <List
            size="large"
            className="min-width-list"
            header={<h1>{label}:手机号</h1>}
            footer={
                <Row gutter={15}>
                    <Col><InputNumForm {...{ name, label, handleAdd }} /></Col>
                    <Col><FileImportForm {...{ name, label, handleAdd }} /></Col>
                </Row>
            }
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
    // console.log(initialList)

    const [list, setList] = useState(/*{ whiteList: [], blackList: [] }*/initialList)

    const handleAdd = async (e, key) => {
        //  e => {key: <value>}
        var add_value = e[key] instanceof Array ? e[key] : [e[key]]

        // 筛选有交集的数据
        add_value = add_value.filter(v => { return !list[key].includes(v) })
        if (!add_value) return
        setList(prevList => {
            return {
                ...prevList,
                [key]: [...prevList[key], ...add_value]
            };
        });
        await BlackWhiteAddAction({ [key]: add_value, key });
    };
    const handleDelete = async (value, key) => {
        // if (!(list[key].includes(blackList[key]))) return;
        setList(prevList => ({
            ...prevList,
            [key]: prevList[key].filter(entry => entry !== value)
        }));
        await BlackWhiteDeleteAction({ [key]: value, key })
    };

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