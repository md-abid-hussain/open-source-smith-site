import TemplatePageHeader from "@/components/template-components/template-page-header";

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