'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { LucideMenu } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut, signIn } from "next-auth/react"

export default function NavBarMenu() {
    const { data: session } = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><LucideMenu /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="hover:cursor-pointer"><Link href="/templates">Templates</Link></DropdownMenuItem>

                {session ? (<>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={`/user/${session.userId}`}>
                            My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button className="w-full" onClick={() => signOut()}>Sign Out</Button>
                    </DropdownMenuItem>
                </>) : (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button className="w-full" onClick={() => signIn("github")}>Sign In</Button>
                        </DropdownMenuItem>
                    </>
                )}


            </DropdownMenuContent>
        </DropdownMenu>
    )

}