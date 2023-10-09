import { Avatar, Button, Divider, Dropdown, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from "next-auth/react";

import React from "react";
import { useRouter } from "next/navigation";


export default function UserNav({ name }) {
    const router = useRouter()
    const { data, status } = useSession()
    // var name = "name"
    // if ("authenticated" === status) name = data.user.name;

    const userSignOut = async () => {
        await signOut({ redirect: false })
        router.push("/sign-in")
    }
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={userSignOut}>
                    注销
                </a>
            ),
        }
    ];
    return (
        // <div >
        <Dropdown menu={{ items }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: '1rem' }}>
                <Avatar style={{ margin: "auto 1rem" }} size="large" icon={<UserOutlined />} />
                <div >欢迎! {name}</div>
            </div>
        </Dropdown>
        // </div>

    )

}

