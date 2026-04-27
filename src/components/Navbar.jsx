"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { Button, Link, Spinner } from "@heroui/react";

const Navbar = () => {
    const { data, isPending } = useSession();

    const user = data?.user

    if (isPending) {
        return (
            <>
                <Button isPending>
                    {({ isPending }) => (
                        <>
                            {isPending ? <Spinner color="current" size="sm" /> : null}
                            Uploading...
                        </>
                    )}
                </Button>
            </>
        );
    }

    return (
        <div>
            <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
                <header className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <p className="font-bold">ACME</p>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                    <div>
                        {user?<>
                            Welcome!, {user.name}
                            <Button onClick={()=>signOut()}>SignOut</Button>
                        </>:<>
                        <Link href="/auth/signin"><Button>Sign In</Button></Link>
                        </>}
                    </div>
                </header>
            </nav>
        </div>
    );
};

export default Navbar;
