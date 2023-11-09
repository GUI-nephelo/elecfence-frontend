'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import { BlackWhiteAddAction } from "./actions";
import { useSession } from "next-auth/react";
import { levelCol } from "@/lib/config";

const { confirm } = Modal;

const confirmAdd = (listname, value, onOk) => {
  confirm({
    title: '确认加入',
    content: `确定要将 ${value} 加入到 ${listname} 吗？`,
    okText: '加入',
    cancelText: '取消',
    direction: "ltr",
    onOk
  });
}


const basicColumns = [
  {
    title: "IMSI",
    dataIndex: "IMSI",
    key: "IMSI",
    width: 70, // 控制列宽度
    align: "center", // 文本居中对齐
  },
  {
    title: "IMEI",
    dataIndex: "IMEI",
    key: "IMEI",
    width: 70,
    align: "center",
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    width: 120,
    align: "center",
    render: x => x.replace("T", " ")
  },
  {
    title: "手机号",
    dataIndex: "phoneNum",
    key: "phoneNum",
    width: 50,
    align: "center",
  }, {
    title: "型号",
    dataIndex: "model",
    key: "model",
    width: 80,
    align: "center",
  }, {
    title: "采集位置",
    dataIndex: "samplePos",
    key: "samplePos",
    width: 80,
    align: "center"
  }
];

// const action = {
//   title: "操作",
//   // dataIndex: "",
//   // key: "phoneNum",
//   width: 80,
//   align: "center",
//   render: ({ phoneNum }) => (
//     <>
//       <Space size="small" direction="vertical">
//         <Button type="link" onClick={
//           () =>
//             confirmAdd("黑名单", phoneNum, async () => {
//               await BlackWhiteAddAction({ key: "blackList", blackList: phoneNum })
//             })
//         }
//         >加入黑名单</Button>
//         <Button type="link" onClick={() =>
//           confirmAdd("白名单", phoneNum,
//             async () => {
//               await BlackWhiteAddAction({ key: "whiteList", whiteList: phoneNum })
//             })}>加入白名单</Button>
//       </Space>
//     </>
//   )
// }

function solvedLevelCol(role) {
  const excludeCols = levelCol[role];
  var cols = basicColumns
  if (excludeCols) excludeCols.forEach(key => cols = cols.filter(ele => ele.key != key));

  return cols;
}


export function TablePage({ currentPage, total, pageSize, items, role }) {
  const router = useRouter()
  // if (userRole == "admin" && columns.length < 6) columns.push(action);

  const columns = solvedLevelCol(role)
  // console.log(columns)


  const handlePageChange = (page, pageSize) => {
    const params = new URLSearchParams({ page, pageSize })
    router.push("/dashboard?" + params)
  }

  const tablePaginationConfig = {
    position: ['bottomLeft'],
    current: currentPage,
    pageSize: pageSize,
    pageSizeOptions: [5, 10, 30, 50],
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
        rowClassName={(record, _) => "inBlackList" in record && record.inBlackList ? "warn" : ""}
        // scroll={{y:390}}
        bordered // 添加表格边框
      />
    </div>
  );
};
