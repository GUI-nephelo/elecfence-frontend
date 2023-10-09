"use server"

import { addBWList, addUser, delUser, deleteBWList } from "@/lib/db"
import { revalidatePath } from "next/cache"


export const userMgeAddAction = async e => {
    console.log("UserAdd", e)
    addUser(e)
    revalidatePath("/dashboard/admin")
}

export const userMgeDeleteAction = async e => {
    console.log("UserDel", e)
    delUser(e.user)
    revalidatePath("/dashboard/admin")
}

export const BlackWhiteAddAction = async e => {
    console.log("AddAction", e)
    await addBWList(e.key, e[e.key])
    revalidatePath("/dashboard/setBlackWhite")
}

export const BlackWhiteDeleteAction = async e => {
    console.log("DeleteAction", e)
    await deleteBWList(e.key, e[e.key])
    revalidatePath("/dashboard/setBlackWhite")
}