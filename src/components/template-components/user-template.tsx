'use client'

import { Template } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteTemplate from "./delete-template";
import { useSession } from "next-auth/react";

interface UserTemplateProp {
    template: Template
    userEmail: string
}

export default function UserTemplate({ template, userEmail }: UserTemplateProp) {
    const { data: session } = useSession();

    const { id, name, description, githubUrl, tags, defaultBranch } = template;

    return (
        <div className="p-4 shadow rounded-md max-w-96 flex flex-col gap-4 dark:shadow-slate-500 w-80 border">
            <h3 className="font-bold text-lg">{name}</h3>

            <p>{description}</p>
            <div>
                Tags:
                <span className="ml-2 text-sm text-muted-foreground">{tags.join(", ")}</span>
            </div>
            <div className="flex gap-4 mt-auto">
                <Link className="flex-1" href={githubUrl} target="_blank">
                    <Button className="w-full">View</Button>
                </Link>
                <Link className="flex-1" target="_blank" href={`${githubUrl}/archive/refs/heads/${defaultBranch}.zip`}><Button className="w-full">Download</Button></Link>
            </div>
            {session && session.user?.email === userEmail && <DeleteTemplate id={id} />}
        </div>
    )

}