'use client'
import React, { useState } from "react";
import { Table, Pagination } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80, // 控制列宽度
    align: "center", // 文本居中对齐
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 120,
    align: "center",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 80,
    align: "center",
  },
];

const dataSource = [];

for (var i = 0; i < 15; i++) {
  var ii = `${i}`
  dataSource.push({ key: ii, id: ii, name: ii, age: ii })
}

export function TablePage({ currentPage, total, pageSize, items }) {

  const handlePageChange=(e)=>{
    console.log(e)
  }

//   const tablePaginationConfig = {
//     current: currentPage,
//     pageSize: pageSize,
//     onChange:handlePageChange,
//     total: dataSource.length,
//     showSizeChanger: true,
//     showQuickJumper: true,
//     // showTotal: total => `总共 ${total} 条数据`,
//   }
//  const [tpc,setTpc]= useState(tablePaginationConfig)

  return (
    <div style={{ padding: "9px" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        // pagination={tablePaginationConfig}
        scroll={{y:390}}
        bordered // 添加表格边框
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
        total={dataSource.length}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `总共 ${total} 条数据`}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};
