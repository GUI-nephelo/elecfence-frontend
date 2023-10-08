"use server"
import { getBWList } from "@/lib/db";
import { BlackWhiteListView } from "./listView";

export default async function setBlackWhitePage({ searchParams }) {

    const names = ["blackList", "whiteList"]
    const initialList = Object()

    for (var x of names) {
        initialList[x] = await getBWList(x)
    }

    return (<BlackWhiteListView {...{ initialList }} />)
}