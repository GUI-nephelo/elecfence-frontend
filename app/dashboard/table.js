'use client'
import React, { useState } from "react";
import { Table, Space, Button } from "antd";
import { useRouter } from "next/navigation";
import { BlackWhiteAddAction } from "./actions";

const columns = [
  {
    title: "IMSI",
    dataIndex: "IMSI",
    key: "IMSI",
    width: 80, // 控制列宽度
    align: "center", // 文本居中对齐
  },
  {
    title: "IMEI",
    dataIndex: "IMEI",
    key: "IMEI",
    width: 120,
    align: "center",
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    width: 80,
    align: "center",
    render: x => x.replace("T", " ")
  },
  {
    title: "手机号",
    dataIndex: "phoneNum",
    key: "phoneNum",
    width: 80,
    align: "center",
  },
  {
    title: "操作",
    // dataIndex: "",
    // key: "phoneNum",
    width: 80,
    align: "center",
    render: ({ phoneNum }) => (
      <>
        {/* <Space size="small"> */}
        <Button type="link" onClick={
          async () => {
            await BlackWhiteAddAction({ key: "blackList", blackList: phoneNum })
          }}>加入黑名单</Button>
        <Button type="link" onClick={
          async () => {
            await BlackWhiteAddAction({ key: "whiteList", whiteList: phoneNum })
          }}>加入白名单</Button>
        {/* </Space> */}
      </>
    )
  }
];


export function TablePage({ currentPage, total, pageSize, items }) {
  const router = useRouter()

  const handlePageChange = (page, pageSize) => {
    const params = new URLSearchParams({ page, pageSize })
    router.push("/dashboard?" + params)
  }

  const tablePaginationConfig = {
    position: ['bottomLeft'],
    current: currentPage,
    pageSize: pageSize,
    pageSizeOptions: [6, 12, 15],
    onChange: handlePageChange,
    total: total,//dataSource.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `总共 ${total} 条数据`,
  }

  return (
    <div style={{ padding: "9px" }}>
      <Table
        columns={columns}
        dataSource={items}
        // pagination={false}
        pagination={tablePaginationConfig}
        // scroll={{y:390}}
        bordered // 添加表格边框
      />
    </div>
  );
};
