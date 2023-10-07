"use client"
import { dataSearchCol, dataSearchColOpt } from "@/lib/config";
import { Button, Checkbox, Col, Input, Row } from "antd";
import Search from "antd/es/input/Search";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function assign(obj, k, v) {
    obj[k] = v
    return obj
}

export function ExtraComponent() {
    const router = useRouter()
    const [cookies, setCookie] = useCookies()
    const setFilter = (v) => { setCookie("filter", v) }


    const [whichCol, setWhichCol] = useState(dataSearchCol)
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        if (!("filter" in cookies)) {
            setFilter({ searchString, whichCol })
        } else {// 将cookie中的参数放在页面上
            setWhichCol(cookies["filter"]["whichCol"])
            setSearchString(cookies["filter"]["searchString"])
            console.log("filter 在cookie中")
        }
    }, [router])

    const onSearch = async (t) => {
        console.log(t)
        setFilter(assign(cookies["filter"], "searchString", t))
        setSearchString(t)

        router.refresh()
    }

    const onChange = async (v) => {
        console.log(v)
        setFilter(assign(cookies["filter"], "whichCol", v))
        setWhichCol(v)
    }

    const options = dataSearchColOpt;
    return (
        <div style={{ padding: "inherit" }}>
            <Row>
                <Col>
                    <Search
                        value={searchString}
                        placeholder="IMSI IMEI 手机号模糊搜索"
                        onSearch={onSearch}
                        onChange={e => { if (!isNaN(Number(e.target.value))) setSearchString(e.target.value) }}
                        style={{ width: 250 }}
                    ></Search>
                </Col>
                <Col offset={3}>
                    <Checkbox.Group options={options} value={whichCol} onChange={onChange} />
                </Col>
                <Col offset={9}>
                    <Button type="primary" href="/api/export">导出</Button>
                </Col>
            </Row>
        </div>

    )
}