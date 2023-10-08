"use server"

import { addBWList, addUser, delUser, deleteBWList } from "@/lib/db"

export const userMgeAddAction = async e => {
    console.log("UserAdd", e)
    addUser(e)
}

export const userMgeDeleteAction = async e => {
    console.log("UserDel", e)
    delUser(e.user)
}

export const BlackWhiteAddAction = async e => {
    console.log("AddAction", e)
    await addBWList(e.key, e[e.key])
}

export const BlackWhiteDeleteAction = async e => {
    console.log("DeleteAction", e)
    deleteBWList(e.key, e[e.key])
}