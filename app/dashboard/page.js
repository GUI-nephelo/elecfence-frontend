
import { notFound } from "next/navigation";
import { TablePage } from "./table"
import { getData, match_all } from "@/lib/db";

export default async function dashboardPage({ searchParams }) {
    "use server"
    const page = Number("page" in searchParams ? searchParams.page : "1");
    const pagesize = Number("pageSize" in searchParams ? searchParams.pageSize : "8")

    // console.log(page, pagesize)
    // 检测搜索字是否合法
    if (isNaN(page) || isNaN(pagesize)) return notFound()

    const { total: { value: total }, hits } = await getData(page, pagesize)

    return (<TablePage currentPage={page} pageSize={pagesize} total={total} items={hits.map(x => x._source)} />)
}