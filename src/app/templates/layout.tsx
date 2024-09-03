import TemplatePageHeader from "@/components/template-components/template-page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenSourceSmith | Template",
    description: "Discover and use open-source templates for your next project. Share your own templates with the community. Generate project setup steps with our AI. From frontend, backend, to full-stack templates, we have everything you need. Get started now with templates from the community, for the community. Includes templates for Python, JavaScript, Java, and more.",
};

export default function TemplatePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="p-4">
            <TemplatePageHeader />
            <>
                {children}
            </>
        </section>
    )
}