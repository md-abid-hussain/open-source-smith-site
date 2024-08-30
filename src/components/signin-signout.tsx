'use client'
import { Button } from "./ui/button"
import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function SignInSignOut() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className="flex gap-4 items-center flex-row-reverse">
                <Link href='/user/profile' className="border-2 rounded-full">
                    <Image src={session.user?.image || ""} alt="User profile image" height={50} width={50} className="rounded-full" />
                </Link>
                <Button onClick={() => signOut({
                    callbackUrl: "/templates"
                })}>Sign Out</Button>
            </div>
        )
    }

    return (
        <div>
            <Button onClick={() => signIn("github")}>Sign In</Button>
        </div>
    )
}