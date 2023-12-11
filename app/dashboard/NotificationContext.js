

import { message } from 'antd';
import { revalidatePath } from 'next/cache';
import { createContext, useContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // 在这里订阅 SSE 事件并更新通知状态
        const eventSource = new EventSource('/api/notification');

        eventSource.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            setNotification(data);
            console.log(data)
            if (data.event == "blacklistAlert")
                message.open({ type: "error", content: `黑名单用户${data.msg}警告`, duration: 10 })

        });
        eventSource.onopen = (event) => {
            message.open({ type: "success", content: "连接数据成功" })
        }
        eventSource.onerror = (event) => {
            // message.open({ type: "error", content: "连接到数据服务器错误", duration: 100 })
            setNotification({ status: "err", ...event })
        }


        return () => {
            // 在组件卸载时取消订阅 SSE 事件
            eventSource.close();
        };
    }, []);

    return (
        <NotificationContext.Provider value={notification}>
            {children}
        </NotificationContext.Provider>
    );
}