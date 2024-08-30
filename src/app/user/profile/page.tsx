import UserTemplate from "@/components/template-components/user-template";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Profile() {

    const session = await getServerSession();

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string,
        }, include: {
            template: true,
        }
    })

    return (
        <div>
            {user && (<div className="hero-height sm:hero-height-sm relative">
                <section className="flex flex-col gap-4 my-8">
                    <figure className="rounded-full mx-auto border-4 p-1">
                        <Image src={user.image || ""} alt={user.name || ""} width={250} height={250} className="rounded-full mx-auto" />
                    </figure>
                    <h1 className="font-bold text-3xl text-center">{user.name}</h1>
                    <h2 className="text-xl text-center"><span className="font-bold">Member since:</span> {new Date(user.createdAt).toDateString()}</h2>
                </section>

                <hr />

                <section className="flex flex-col gap-4 mt-8 p-8">
                    <h2 className="font-bold text-2xl">Templates added by <span className="underline">{user.name}</span></h2>
                    <div className="flex gap-4 flex-wrap">
                        {user.template.map((template) => {
                            const userTemplate = { ...template, createdAt: new Date(template.createdAt).toDateString(), updatedAt: new Date(template.updatedAt).toDateString() }
                            return <UserTemplate key={template.id} template={userTemplate} userEmail={user.email} />
                        }
                        )}
                    </div>
                </section>
            </div>)}
        </div>
    )

}