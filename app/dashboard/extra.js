"use client"
import { dataSearchColOpt, levelCol } from "@/lib/config";
import { Button, Checkbox, Col, DatePicker, Row } from "antd";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


const { RangePicker } = DatePicker;

function assign(obj, k, v) {
    obj[k] = v
    return obj
}

export function ExtraComponent({ role }) {
    const router = useRouter()
    const [cookies, setCookie] = useCookies()
    const setFilter = (v) => { setCookie("filter", v, { path: "/" }) }

    // 根据用户权限过滤后的搜索选项
    const options = dataSearchColOpt.filter(x => !levelCol[role].includes(x.value));

    const [whichCol, setWhichCol] = useState(options.map(x => x.value))
    const [searchString, setSearchString] = useState("")
    const [dateRange, setDateRange] = useState([null, null])

    useEffect(() => {
        if (!("filter" in cookies)) {
            setFilter({ searchString, whichCol, dateRange })
        } else {// 将cookie中的参数放在页面上
            setWhichCol(cookies["filter"]["whichCol"])
            setSearchString(cookies["filter"]["searchString"])
            setDateRange(cookies["filter"]["dateRange"])
            // console.log("filter 在cookie中")
        }
    }, [router])

    const onSearch = async t => {

        setFilter(assign(cookies["filter"], "searchString", t))
        setSearchString(t)
        // revalidatePath("/dashboard")
        router.refresh()
    }

    const onColCheckBoxChange = async v => {
        // console.log(v)
        setFilter(assign(cookies["filter"], "whichCol", v))
        setWhichCol(v)
    }

    const onRangePickerChange = async v => {
        const range = Array.isArray(v) ? v.map(x => (x == null ? x : x.$d.getTime())) : [null, null]
        setFilter(assign(cookies["filter"], "dateRange", range))
        setDateRange(Array.isArray(v) ? v : [null, null])
        router.refresh()
    }

    return (
        <div style={{ padding: "inherit" }}>
            <Row>
                <Col>
                    <Search
                        value={searchString}
                        placeholder={`${options.map(x => x.label).join(" ")}模糊搜索`}
                        onSearch={onSearch}
                        onChange={e => { if (!isNaN(Number(e.target.value))) setSearchString(e.target.value) }}
                        style={{ width: 250 }}
                    ></Search>
                </Col>
                <Col offset={1}>
                    <Checkbox.Group options={options} value={whichCol} onChange={onColCheckBoxChange} style={{ margin: "0 auto" }} />
                </Col>
                <Col offset={1}>
                    <RangePicker onChange={onRangePickerChange} value={dateRange.map(x => (x != null ? dayjs(x) : null))} allowEmpty={[true, true]} showTime />
                </Col>
                <Col offset={1}>
                    <Button type="primary" href="/api/export">导出</Button>
                </Col>
            </Row>
        </div >

    )
}