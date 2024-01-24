"use client"
import { NotificationProvider } from "./NotificationContext";
import DashboardLayoutClient from "./dashboardLayout";


export default function DashboardLayout({ children }) {
  return (
    <NotificationProvider>
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </NotificationProvider>
  )
}
