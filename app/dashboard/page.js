
import { notFound } from "next/navigation";
import { TablePage } from "./table"
import { getData, match_all } from "@/lib/db";
import { ExtraComponent } from "./extra";
import { cookies } from "next/headers";
import { getCurrentSession } from "@/lib/session";
import { levelCol } from "@/lib/config";


export default async function dashboardPage({ searchParams }) {
    // "use server"
    const page = Number("page" in searchParams ? searchParams.page : "1");
    const pageSize = Number("pageSize" in searchParams ? searchParams.pageSize : "10")

    const cookieStore = cookies()
    const filter = JSON.parse((cookieStore.get("filter") || { value: "{}" }).value)

    // console.log(filter)

    // 检测搜索字是否合法
    if (isNaN(page) || isNaN(pageSize)) return notFound()

    const { total, hits } = await getData({ page, pageSize, ...filter })

    const { user: { userRole } } = await getCurrentSession();

    const levelToExclude = levelCol[userRole]
    const items = hits.map(x => x._source)
        .map(x => { return { ...x, samplePos: "信息港1" } })
        .map(obj => {
            levelToExclude.forEach(key => delete obj[key]);
            return obj;
        })
    return (
        <>
            <ExtraComponent role={userRole} />
            {
                (filter.searchString ||
                    (filter.dateRange ? (filter.dateRange[0] || filter.dateRange[1]) : false)) &&
                <TablePage
                    role={userRole}
                    currentPage={page}
                    pageSize={pageSize}
                    total={total}
                    items={items}
                />
            }
        </>

    )
}