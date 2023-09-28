import { getCurrentSession } from "@/lib/session";



export async function Admin(){

    const session = await getCurrentSession()
    return (
        <>
        <h1>This is admin page</h1>
        <>{JSON.stringify(session)}</>
        </>
        
    )
}