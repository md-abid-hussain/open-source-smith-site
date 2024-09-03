import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { TemplateWithAuthor } from "@/lib/types";
import Link from "next/link";
import CodeBlockWithCopyButton from "@/components/copy-clipboard";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenSourceSmith | Template",
    description: "Discover and use open-source templates for your next project. Share your own templates with the community. Generate project setup steps with our AI. From frontend, backend, to full-stack templates, we have everything you need. Get started now with templates from the community, for the community. Includes templates for Python, JavaScript, Java, and more.",
};

function extractUsernameRepo(githubUrl: string): string {
    // Regular expression to match GitHub URL and capture username and repo
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/;
    const match = githubUrl.match(regex);

    if (match) {
        const username = match[1];
        const repo = match[2];
        return `${username}@${repo}`;
    } else {
        // Return null if the URL does not match the expected pattern
        return "";
    }
}

export default async function SingleTemplatePage({ params }: { params: { templateId: string } }) {

    const response = await fetch(`${process.env.HOST_URL}/api/templates/${params.templateId}`, {
        cache: "no-cache"
    });

    if (!response.ok) {
        let error;
        if (response.status === 404) {
            error = "Template not found";
        } else {
            error = "Failed to fetch template";
        }
        return (
            <div className="flex flex-col justify-center items-center" style={{
                minHeight: "calc(100vh - 16rem)"
            }}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center p-4">
                    Template Not Found

                </h1>
                <Link href="/templates" className=" block w-[250px]"><Button className="min-w-full">Go Back</Button></Link>
            </div>
        )
    }

    const template: TemplateWithAuthor = await response.json();

    return (
        <div className="flex flex-col border rounded-md p-4 sm:p-8 w-[800px] max-w-full shadow mx-auto" style={{
            minHeight: "calc(100vh - 15rem)"
        }}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href={`/user/${template.authorId}`}>{template.author.name}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href="/components">{template.name}</Link>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mt-8 sm:p-4 flex-1">
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 ">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-center">{template.name}</h1>
                    <p className="text-center text-muted-foreground sm:text-lg sm:my-2">{template.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                        <p className="w-[250px] min-w-ful"><span className="font-semibold">Template Type:</span> {template.templateType}</p>
                    </div>
                    <div className="flex-1">
                        <p className="w-[250px] min-w-ful"><span className="font-semibold">Template Subtype: </span> {template.subtype}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                        <p className="w-[250px] min-w-ful"><span className="font-semibold">Added On:</span> {new Date(template.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex-1">
                        <p className="w-[250px] min-w-ful"><span className="font-semibold">Updated On:</span> {new Date(template.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    <p><span className="font-semibold">Tags:</span> {template.tags.join(", ")}</p>
                </div>
                <div>
                    <p className="pb-2 font-semibold">Use this template:</p>
                    <CodeBlockWithCopyButton data={extractUsernameRepo(template.githubUrl)} />
                </div>
            </div>
            <div className="flex gap-4 flex-wrap">
                <Link href={template.githubUrl} className="flex-1">
                    <Button className="w-[250px] min-w-full">View on GitHub</Button>
                </Link>
                <Link href={`${template.githubUrl}/archive/refs/heads/${template.defaultBranch}.zip`} className="flex-1">
                    <Button className="w-[250px] min-w-full">Download</Button>
                </Link>
            </div>
        </div>
    );
}