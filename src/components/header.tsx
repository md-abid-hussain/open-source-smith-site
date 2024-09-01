'use client'

import ThemeToggle from "./theme-toggle"
import Link from "next/link"
import SignInSignOut from "./signin-signout"
import NavBarMenu from "./navbar-menu"
import { usePathname } from "next/navigation"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"

export default function Header() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <header className="flex justify-between items-center p-2 sm:p-4 border-b flex-wrap sticky top-0 bg-background z-10">
                <section className="flex flex-row-reverse items-center">
                    <div>
                        <Link href='/'>
                            <h2 className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight flex gap-4">
                                <span>OpenSourceSmith</span>
                            </h2>
                            <p className="sm:text-xl text-muted-foreground">
                                Forge your project with ease
                            </p>
                        </Link>
                    </div>
                </section>
                <section className="md:hidden">
                    <NavBarMenu />
                </section>
                <section className="gap-4 items-center md:flex hidden">
                    <ThemeToggle />
                    <a className="hover:underline" href="https://amomynus.mintlify.app/introduction" target="_blank">Docs</a>
                    <Link href="/templates" className="hover:underline border-r-2 pr-4 border-black dark:border-white">Templates</Link>
                    <SignInSignOut />
                </section>
            </header>
            {pathname === '/' && <Accordion type="single" collapsible className="w-full" value={isOpen ? 'item-1' : ''} onValueChange={(value) => setIsOpen(value === 'item-1')}>
                <AccordionItem value="item-1" className="px-4 fixed min-w-full bg-background">
                    <AccordionTrigger className="hover:no-underline">On This Page</AccordionTrigger>
                    <AccordionContent>
                        <nav>
                            <ul>
                                <li className="text-lg font-semibold">
                                    <Link href="#introduction" onClick={handleLinkClick}>- Introduction</Link>
                                </li>
                                <li className="text-lg font-semibold">
                                    <Link href="#why-choose-our-platform" onClick={handleLinkClick}>- Why Choose Our Platform</Link>
                                </li>
                                <li className="text-lg font-semibold">
                                    <Link href="#tools-used-in-building" onClick={handleLinkClick}>- Tools Used in Building</Link>
                                </li>
                            </ul>
                        </nav>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}
        </>
    )
}