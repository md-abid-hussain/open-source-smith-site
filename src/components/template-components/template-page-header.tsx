import Link from "next/link"
import { Button } from "../ui/button"


export default function TemplatePageHeader() {
    return (
        <section className="flex justify-between items-center mb-4 flex-wrap">
            <div className="mb-4">
                <Link href="/templates">
                    <h1 className="text-2xl font-bold">Templates</h1>
                    <p className="text-muted-foreground">Template from community to community</p>
                </Link>
            </div>
            <ul className="flex gap-4 w-80">
                <li className="flex-1"><Link href="/templates/add_template"><Button className="min-w-full">Add Template</Button></Link></li>
                <li className="flex-1"><Link href="/templates/generate"><Button className="min-w-full">Generate Steps</Button></Link></li>
            </ul>
        </section>
    )
}