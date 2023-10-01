import { notFound } from "next/navigation";
import { TablePage } from "./table"


function dashboardPage({ searchParams }) {
    const page = Number("page" in searchParams ? searchParams.page : "1");
    const pagesize = Number("pageSize" in searchParams ? searchParams.pageSize : "5")

    console.log(page, pagesize)
    // 检测搜索字是否合法
    if (isNaN(page) || isNaN(pagesize)) return notFound()

    return (<TablePage currentPage={page} pageSize={pagesize} />)
}

export default dashboardPage