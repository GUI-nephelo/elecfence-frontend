import { NextResponse } from "next/server";
import fs from 'fs';
import ExcelJS from 'exceljs';
import { cookies } from 'next/headers'
import { getData } from "@/lib/db";

const headers = {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename=export.xlsx',
}

const colW = [16, 16, 20, 15]

export async function GET() {
    const cookieStore = cookies()
    const filter = JSON.parse(cookieStore.get("filter").value)

    const { hits } = await getData({ page: 1, pageSize: -1, ...filter })
    // const file = fs.readFileSync("/home/Lenovo/elecfence-frontend/start.js")

    const __data = hits.map(x => x._source)
    const data = __data.map(x => Object.values(x));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('电子围栏数据');
    const colHeader = []

    for (var i in Object.keys(__data[0])) {
        colHeader.push({ headers: Object.keys(__data[0])[i], key: Object.keys(__data[0])[i], width: colW[i] })
    }
    // console.log(colHeader)
    worksheet.columns = colHeader

    // 将数据数组添加到工作表
    worksheet.addRow(colHeader.map(x => x.headers))
    worksheet.addRows(data);
    const file = await workbook.xlsx.writeBuffer()


    // return NextResponse.json({ "msg": "hello", req })
    return new NextResponse(file, { headers })
}