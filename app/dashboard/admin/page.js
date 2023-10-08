import { getUser } from "@/lib/db";
import { Admin } from "./admin";
import UserManagement from "./userMangement";

export default async function adminPage({ searchParams }) {
    // console.log("hello admin")
    const userList = await getUser()
    return (
        <UserManagement initialList={userList} />
    )
}