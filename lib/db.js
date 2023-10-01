// 'use server'

async function match_all() {
    const a = await fetch("http://localhost:9200/elec-fence/_search", {
        "method": "POST",
        // "body":JSON.stringify('{"query":{"match_all" : {}}}')
    })
    return (await a.json()).hits
}

async function query(index, q) {
    const body = {
        query: q
    }
    const a = await fetch(`http://localhost:9200/${index}/_search`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    })
    return (await a.json()).hits
}

// 认证
async function auth(user, pass) {
    const out = (await query("shadow", { match: { user } })).hits
    console.log(JSON.stringify(out))
    const found = out.some(x => x._source.pass == pass)
    return found
}


export { match_all, auth }
