
import DashboardLayoutClient from "./dashboardLayout";
import { getCurrentSession } from "@/lib/session";

export default async function DashboardLayout({ children }) {
  const session = await getCurrentSession()


  return (
    <DashboardLayoutClient {...{ session }} >
      {children}
    </DashboardLayoutClient>
  )
}
