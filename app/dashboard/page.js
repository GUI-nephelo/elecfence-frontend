
import { notFound } from "next/navigation";
import { TablePage } from "./table"
import { getData, match_all } from "@/lib/db";
import { ExtraComponent } from "./extra";
import { cookies } from "next/headers";
import { getPermission } from "@/lib/session";


export default async function dashboardPage({ searchParams }) {
    // "use server"
    const page = Number("page" in searchParams ? searchParams.page : "1");
    const pageSize = Number("pageSize" in searchParams ? searchParams.pageSize : "6")

    const cookieStore = cookies()
    const filter = JSON.parse((cookieStore.get("filter") || { value: "{}" }).value)

    console.log(filter)
    // console.log(page, pagesize)
    // 检测搜索字是否合法
    if (isNaN(page) || isNaN(pageSize)) return notFound()

    const { total: { value: total }, hits } = await getData({ page, pageSize, ...filter })

    const permission = await getPermission()
    return (
        <>
            <ExtraComponent />
            <TablePage
                currentPage={page}
                pageSize={pageSize}
                total={total}
                items={hits.map(x => x._source)}
                permission={permission}
            />
        </>

    )
}