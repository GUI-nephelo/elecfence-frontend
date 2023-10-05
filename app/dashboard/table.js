'use client'
import React, { useState } from "react";
import { Table, Pagination } from "antd";
import { useRouter } from "next/navigation";

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
    pageSizeOptions: [5, 8, 16, 15],
    onChange: handlePageChange,
    total: total,//dataSource.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `总共 ${total} 条数据`,
  }
  // const [tpc, setTpc] = useState(tablePaginationConfig)

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
      {/* <Pagination
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handleSizeChange}
        total={dataSource.length}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `总共 ${total} 条数据`}
        style={{ marginTop: "20px", textAlign: "center" }}
      /> */}
    </div>
  );
};
