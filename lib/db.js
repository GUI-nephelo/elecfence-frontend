

import { dataSearchColOpt } from "./config";

async function match_all() {
    const a = await fetch("http://localhost:9200/elec-fence/_search", {
        "method": "POST",
        // "body":JSON.stringify('{"query":{"match_all" : {}}}')
    })
    return (await a.json()).hits
}
// -------------------------------------------------------------------------------------------------
async function search(index, body = { size: 10000, "query": { "match_all": {} } }, sq = {}) {
    // console.log(body)
    try {
        const a = await fetch(`http://localhost:9200/${index}/_search?${new URLSearchParams(sq)}`, {
            cache: 'no-cache',
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(body)
        })
        const out = (await a.json());
        if ("error" in out) throw new Error(JSON.stringify(out))
        return out
    } catch (err) {
        return { err }
    }

}
export { search };
async function put(index, body, id = "", sq = {}) {
    // console.log(body)
    const a = await fetch(`http://localhost:9200/${index}/_doc/${id}?${new URLSearchParams(sq)}`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    })
    const out = (await a.json());
    if ("error" in out) throw new Error(JSON.stringify(out))
    return out
}

async function del(index, body = { "query": { "match_all": {} } }, sq = {}) {
    const a = await fetch(`http://localhost:9200/${index}/_delete_by_query?${new URLSearchParams(sq)}`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    })
    // console.log(body)
    const out = (await a.json());
    if ("error" in out) throw new Error(JSON.stringify(out))
    return out
}
// -------------------------------------------------------------------------------------------------
// 认证
export async function auth(user, pass) {
    const out = (await search("shadow", { query: { match: { user } } })).hits.hits
    // console.log(JSON.stringify(out))
    const found = out.some(x => x._source.pass == pass)
    return found
}

export async function getLevel(user) {
    if (user == "admin") return "A";
    const out = (await search("shadow", { query: { match: { user } } })).hits.hits
    return out[0]._source.role
}

export async function getUser() {
    const out = (await search("shadow")).hits.hits
    // console.log(out)
    return out.map(x => x._source)
}

export async function addUser(obj) {
    await put("shadow", obj)
}

export async function delUser(user) {
    await del("shadow", {
        query: { match: { user } }
    })
}

// -------------------------------------------------------------------------------------------------
// 获取数据
export async function getData({ page, pageSize, searchString, whichCol, dateRange }) {
    if (!dateRange) dateRange = [null, null]
    else dateRange = dateRange.map(v => (v == null ? v : v + 28800000))
    var searchBody = {
        must: [{ range: { time: { gte: dateRange[0], lte: dateRange[1] } } }]
    };
    if (searchString) {
        if (!whichCol) whichCol = dataSearchColOpt.map(x => x.value);
        searchBody.must.push(
            { bool: { should: whichCol.map(x => { return { "regexp": { [x]: `.*${searchString}.*` } } }) } }
        )
    }
    const query = { "query": { "bool": { ...searchBody } } }
    const total = (await (await fetch("http://localhost:9200/elec-fence/_count", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(query)
    })).json()).count

    if (pageSize == -1) pageSize = total;

    const out = await search("elec-fence",
        {
            "size": pageSize,
            "from": (page - 1) * pageSize,
            "sort": { "time": { "order": "desc" } },
            ...query
        }
    )
    // console.log(total)

    return { total, hits: out.hits.hits }
}

// -------------------------------------------------------------------------------------------------
export async function getBWList(name) {
    // const list = (await search(name.toLowerCase())).hits.hits
    // console.log(list);
    // console.log(list.map(x => x._source.phoneNum))
    // return list.map(x => x._source.phoneNum)
    return (await search(name.toLowerCase())).hits.hits.map(x => x._source.phoneNum);
}

async function reloadBWListBackend() {
    return fetch("http://localhost:8000/reloadBWList")
    // console.log(o)
}

export async function addBWList(name, value) {
    // console.log(name, value)
    const out = await put(name.toLowerCase(), { phoneNum: value }).then(out => {
        return pipelineCtrl(name)
    }).then(updateListChange) // 名单增加时触发
        .then(reloadBWListBackend)
}

export async function deleteBWList(name, value) {
    const out = await del(name.toLowerCase(), { query: { match: { phoneNum: value } } }).then(out => {
        return pipelineCtrl(name)
    }).then(updateListChange)
        .then(reloadBWListBackend)
}
// -------------------------------------------------------------------------------------------------
// 黑白名单控制
const setPipeline = async (name, list, oldPipelines) => {
    const processors = name[0] === 'b'
        ? [oldPipelines[0], { "script": { "source": `ctx.inBlackList=(${JSON.stringify(list)}.contains(ctx.phoneNum));` } }]
        : [{ "drop": { "if": `${JSON.stringify(/*list*/[])}.contains(ctx.phoneNum)` } }, oldPipelines[1]];
    // 使白名单的过滤功能失效
    const raw = await fetch(`http://localhost:9200/_ingest/pipeline/blackwhitelist-filter-pipeline`, {
        "method": "PUT",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify({ processors })
    });
    return await raw.json()
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 更新数据库管道
export async function pipelineCtrl(name) {
    // 等待数据库刷新
    await delay(1500)
    // 拉取名单
    const list = (await search(name.toLowerCase())).hits.hits.map(x => x._source.phoneNum)
    const oldPipelines = (await fetch("http://localhost:9200/_ingest/pipeline/blackwhitelist-filter-pipeline", {
        "method": "GET",
        "headers": { "Content-Type": "application/json" },
    }).then(raw => raw.json()))["blackwhitelist-filter-pipeline"].processors
    console.log("pipeLineGetList", name, list)
    const out = await setPipeline(name, list, oldPipelines)
    console.log(out)
    return { name, list }
}
// 更新数据库，使所有数据重新通过管道
export async function updateListChange({ name, list }) {
    const query = { terms: { phoneNum: list } }
    const out = await fetch(`http://localhost:9200/elec-fence/_${name[0] == "b" ? "update" : "delete"}_by_query`, {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify({ query })
    }).then(raw => raw.json())
    return out
}