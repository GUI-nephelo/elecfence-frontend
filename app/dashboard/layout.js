import { match_all } from "@/lib/db";
import DashboardLayoutClient from "./dashboardLayout";
import { getCurrentSession } from "@/lib/session";

export default async function DashboardLayout({ children }) {
  const session = await getCurrentSession()
  // const data=await match_all()
  // console.log(JSON.stringify(data))
  return (
    <DashboardLayoutClient session={session} >
      {children}
    </DashboardLayoutClient>
  )
}
