import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section id="introduction" className="min-h-screen grid grid-cols-1 md:grid-cols-[50%,50%] gap-4 min-w-80 max-w-[1400px] mx-auto place-items-center px-4 sm:px-8 py-10 scroll-m-32 mt-16">
            <div className="flex flex-col gap-4 md:gap-8 items-center md:items-start text-center md:text-left mb-8">
                <h1 className="scroll-m-20 pb-2 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight first:mt-0">
                    Empower Your Development with Curated Open Source Templates
                </h1>
                <p className="text-muted-foreground md:text-lg lg:text-2xl">
                    Start your next project in minutes with ready-to-use templates for frontend, backend, and full-stack applications. Our platform connects you with the best open-source resources, tailored to kickstart your journey. Upload templates from your GitHub repo, use our CLI tool open-source-smith, and generate project setup steps from README, Dockerfile to GitHub Actions. Whether you&apos;re a beginner or an experienced developer, our tools are designed to save you time and effort, allowing you to focus on building great software. Explore a wide range of options and find the perfect template to suit your needs.
                </p>
                <Link href={'/templates'} className="w-80">
                    <Button variant="default" className="min-w-full">
                        Get Started
                    </Button>
                </Link>
            </div>
            <figure className="flex justify-center p-4 border rounded-lg">
                <Image priority src="/hero-img.jpg" alt="Hero Image" width={500} height={500} className="h-auto min-w-28 max-w-full rounded-md" />
            </figure>
        </section>
    )
}