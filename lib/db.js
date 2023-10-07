// 'use server'

import { dataSearchCol } from "./config";

// import { Client } from "@elastic/elasticsearch"

// conn = new Client([{ hosts: "http://localhost:9200" }])

async function match_all() {
    const a = await fetch("http://localhost:9200/elec-fence/_search", {
        "method": "POST",
        // "body":JSON.stringify('{"query":{"match_all" : {}}}')
    })
    return (await a.json()).hits
}

async function search(index, body, sq = {}) {
    // console.log(body)
    const a = await fetch(`http://localhost:9200/${index}/_search?${new URLSearchParams(sq)}`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    })
    const out = (await a.json());
    if ("error" in out) throw new Error(out.reason)
    return out
}

// 认证
async function auth(user, pass) {
    const out = (await search("shadow", { query: { match: { user } } })).hits.hits
    // console.log(JSON.stringify(out))
    const found = out.some(x => x._source.pass == pass)
    return found
}

async function getData({ page, pageSize, searchString, whichCol }) {
    var searchBody = {};
    if (searchString) {
        if (!whichCol) whichCol = dataSearchCol;
        searchBody = {
            should: whichCol.map(x => { return { "regexp": { [x]: `.*${searchString}.*` } } })
        }
    }

    const out = await search("elec-fence",
        {
            "size": pageSize,
            "from": (page - 1) * pageSize,
            "sort": { "time": { "order": "desc" } },
            "query": {
                "bool": {
                    "must_not": [
                        { "term": { "IMEI": "000000000000000" } },
                        { "term": { "phoneNum": "" } }
                    ],
                    ...searchBody
                }
            },
        }
    )
    return out.hits
}


export { match_all, auth, getData }
