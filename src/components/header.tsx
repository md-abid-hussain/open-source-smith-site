import ThemeToggle from "./theme-toggle"
import Link from "next/link"
import SignInSignOut from "./signin-signout"
import NavBarMenu from "./navbar-menu"

export default async function Header() {

    return (
        <header className="flex justify-between items-center p-2 sm:p-4 border-b flex-wrap">
            <section className="flex flex-row-reverse items-center">
                <div>
                    <Link href='/'>
                        <h2 className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight flex gap-4">
                            <span>OpenSourceForge</span>
                        </h2>
                        <p className="sm:text-xl text-muted-foreground">
                            Forge your future with open source
                        </p>
                    </Link>
                </div>
            </section>
            <section className="md:hidden">
                <NavBarMenu />
            </section>
            <section className="gap-4 items-center md:flex hidden">
                <ThemeToggle />
                <Link href="/templates" className="hover:underline border-r-2 pr-4 border-black dark:border-white">Templates</Link>
                <SignInSignOut />
            </section>
        </header>
    )
}