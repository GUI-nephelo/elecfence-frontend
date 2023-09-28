import { Avatar, Button, Divider, Dropdown, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { getCurrentSession } from "@/lib/session";
import { signOut } from "next-auth/react";



import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";


export default function UserNav({ props,username }) {
    const router = useRouter()

    // console.log(props)

    // const {user:{name:name}} = await getCurrentSession();
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
        <Dropdown menu={{ items }}
            // dropdownRender={(menu) => (
            //     <div>
            //         {React.cloneElement(menu)}
            //         <Divider style={{ margin: "0" }} />
            //         <Space style={{ padding: 8 }}>
            //             <Button onClick={userSignOut} type="primary">注销</Button>
            //         </Space>
            //     </div>
            // )}
            
            >
            <div style={{ display: 'flex', flexDirection: 'row', marginRight: '1rem' }}>
                <Avatar style={{ margin: "auto 1rem" }} size="large" icon={<UserOutlined />} />
                <div >欢迎! {username}</div>
            </div>
        </Dropdown>
        // </div>

    )

}

