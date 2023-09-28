import DashboardLayoutClient from "./dashboardLayout";
import { getCurrentSession } from "@/lib/session";

export default async function DashboardLayout({children}) {
  const session = await getCurrentSession()

  // const jwt = await fetch(`${process.env.NEXTAUTH_URL}/jwt`)
  // console.log(await jwt.text())
  
  return (
    <DashboardLayoutClient session={session} >
      {children}
    </DashboardLayoutClient>
  )
}
