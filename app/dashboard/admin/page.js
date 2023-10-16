import { getUser, search } from "@/lib/db";
import { Admin } from "./admin";
import UserManagement from "./userMangement";

export default async function adminPage({ searchParams }) {
    // console.log("hello admin")
    // const userList = await getUser()
    var userList = []
    try {
        userList = (await search("shadow")).hits.hits.map(x => x._source)
    } catch (e) {
        console.log(e)
    }

    return (
        <UserManagement initialList={userList} />
    )
}