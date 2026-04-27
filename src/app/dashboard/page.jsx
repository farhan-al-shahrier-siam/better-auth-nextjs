import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session)
    const user = session?.user

    if(!user){
        return <>Please sign in to access dashboard</>
    }

    return (
        <div>
            <h2>This Dashboard</h2>
        </div>
    );
};

export default DashboardPage;
