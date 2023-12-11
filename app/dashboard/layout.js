"use client"
import { NotificationProvider } from "./NotificationContext";
import DashboardLayoutClient from "./dashboardLayout";


export default async function DashboardLayout({ children }) {
  // const session = await getCurrentSession()
  return (
    <NotificationProvider>
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </NotificationProvider>
  )
}
