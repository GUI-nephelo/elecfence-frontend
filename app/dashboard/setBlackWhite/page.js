// "use server"
import { getBWList } from "@/lib/db";
import { BlackWhiteListView } from "./listView";

const names = ["blackList", "whiteList"]
export default async function setBlackWhitePage({ searchParams }) {

    const initialList = Object()

    for (var x of names) {
        initialList[x] = await getBWList(x)
    }
    // console.log("initialList:", initialList)

    return (<BlackWhiteListView {...{ initialList }} />)
}
export const dynamic = 'force-dynamic'