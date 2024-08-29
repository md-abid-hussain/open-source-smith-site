import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="hero-height sm:hero-height-sm flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-4xl sm:text-5xl mb-8">Page not found</p>
            <Link href="/">
                <Button variant={"default"}>Go back home</Button>
            </Link>
        </section>
    )
}