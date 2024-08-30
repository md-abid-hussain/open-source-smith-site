'use client'

import UserTemplate from "@/components/template-components/user-template";
import { UserWithTemplates } from "@/lib/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession()
    const [user, setUser] = useState<UserWithTemplates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/profile`, { cache: "no-cache" });
                if (response.ok) {
                    const user = await response.json();
                    setUser(user);
                } else {
                    const error = await response.json();
                    setError(JSON.stringify(error));
                }
            } catch (error) {
                setError(JSON.stringify(error));
            } finally {
                setLoading(false);
            }
        }

        if (session !== null) {
            fetchUser();
        }

    }, [])

    if (session === null) {
        return (
            <div className="flex justify-center items-center hero-height sm:hero-height-sm">
                <p className="text-lg">Please sign in to view your profile</p>
            </div>
        )
    } else if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-lg">Loading...</p>
            </div>
        )
    }
    else if (error) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        )
    } else {
        return (
            <div>
                {user && (<div className="hero-height sm:hero-height-sm relative">
                    <section className="flex flex-col gap-4 pt-8 mb-8">
                        <figure className="rounded-full mx-auto border-4 p-1">
                            <Image src={user.image || ""} alt={user.name || ""} width={250} height={250} className="rounded-full mx-auto" />
                        </figure>
                        <h1 className="font-bold text-3xl text-center">{user.name}</h1>
                        <h2 className="text-xl text-center"><span className="font-bold">Member since:</span> {new Date(user.createdAt).toDateString()}</h2>
                    </section>
                    <hr />
                    <section className="flex flex-col gap-4 p-8">
                        <h2 className="font-bold text-2xl">Templates added by <span className="underline whitespace-nowrap">{user.name}</span></h2>
                        <div className="flex gap-4 flex-wrap">
                            {user.template ? user.template.map((template) => {
                                const userTemplate = { ...template, createdAt: new Date(template.createdAt).toDateString(), updatedAt: new Date(template.updatedAt).toDateString() }
                                return <UserTemplate key={template.id} template={userTemplate} userEmail={user.email} />
                            }
                            ) : <p className="text-lg text-center">No templates added yet</p>}
                        </div>
                    </section>
                </div>)}
            </div>
        )
    }
}