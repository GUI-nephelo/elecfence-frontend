import {TablePage} from "./table"


function dashboardPage({params,searchParams}){
    const page = Number("page" in searchParams?searchParams.page:"0");
    const size = Number("size" in searchParams?searchParams.size:"5")

    return (<TablePage currentPage={page+1} pageSize={size}/>)
}

export default dashboardPage