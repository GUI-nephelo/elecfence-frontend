"use client"
import DashboardLayoutClient from "./dashboardLayout";

export default async function DashboardLayout({ children }) {
  // const session = await getCurrentSession()
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  )
}
