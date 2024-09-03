import { UserWithTemplates } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import UserTemplate from "@/components/template-components/user-template";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenSourceSmith | User Profile",
    description: "Discover templates added by a user on OpenSourceSmith. Find the perfect template for your next project. Share your own templates with the community. Generate project setup steps with our AI.",
};

export default async function UserProfile({ params }: { params: { userId: string } }) {

    const response = await fetch(`${process.env.HOST_URL}/api/user/${params.userId}`, {
        cache: "no-cache",
    });

    if (!response.ok) {
        return (
            <div className="hero-height sm:hero-height-sm flex justify-center items-center flex-col">
                <h1 className="text-3xl">User Not Found</h1>
                <Link href="/">Go Home</Link>
            </div>
        );
    }

    const user: UserWithTemplates = await response.json();

    return (
        <div className="hero-height sm:hero-height-sm relative">
            <section className="flex flex-col gap-4 my-8">
                <figure className="rounded-full mx-auto border-4 p-1">
                    <Image src={user.image} alt={user.name} width={250} height={250} className="rounded-full mx-auto" />
                </figure>
                <h1 className="font-bold text-3xl text-center">{user.name}</h1>
                <h2 className="text-xl text-center"><span className="font-bold">Member since:</span> {new Date(user.createdAt).toDateString()}</h2>
            </section>

            <hr />

            <section className="flex flex-col gap-4 mt-8 p-8">
                <h2 className="font-bold text-2xl">Templates added by <span className="underline">{user.name}</span></h2>
                <div className="flex gap-4 flex-wrap">
                    {user.template.map((template) => (
                        <UserTemplate key={template.id} template={template} userEmail={user.email} />
                    ))}
                </div>
            </section>
        </div>
    );
}