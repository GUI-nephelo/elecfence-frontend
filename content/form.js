import React from "react";
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

const dataSource = [
  {
    key: "1",
    id: "1",
    name: "John Doe",
    age: 32,
  },
  {
    key: "2",
    id: "2",
    name: "Jane Smith",
    age: 42,
  },
  {
    key: "2",
    id: "2",
    name: "Jane Smith",
    age: 42,
  },{
    key: "2",
    id: "2",
    name: "Jane Smith",
    age: 42,
  },{
    key: "2",
    id: "2",
    name: "Jane Smith",
    age: 42,
  },
  // 添加更多示例数据
];

const TablePage = ({ currentPage, handlePageChange }) => {
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  console.log(columns)

  return (
    <div style={{ padding: "20px" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
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

export default TablePage;
