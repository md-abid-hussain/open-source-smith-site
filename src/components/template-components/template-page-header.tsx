import Link from "next/link"
import { Button } from "../ui/button"


export default function TemplatePageHeader() {
    return (
        <section className="flex justify-between items-center mb-4 flex-wrap">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Templates</h1>
                <p className="text-muted-foreground">Template from community to community</p>
            </div>
            <ul className="flex gap-4">
                <li><Link href="/templates/add_template"><Button>Add Template</Button></Link></li>
                <li><Link href="/templates/generate"><Button>Generate</Button></Link></li>
            </ul>
        </section>
    )
}