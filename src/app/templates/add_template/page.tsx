import AddTemplatePageForm from "@/components/template-components/add-template-component";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenSourceSmith | Add Template",
    description: "Share your template and let the community thrive with your creativity!",
};

export default async function AddTemplatePage() {

    const session = await getServerSession(authConfig)

    return (
        <div className="hero-height sm:hero-height-sm flex flex-col justify-center py-10">
            {session ?
                <>
                    <section className="mb-8">
                        <h1 className="text-3xl text-center font-bold">Add Template</h1>
                        <p className="text-center text-muted-foreground">Share your template and let the community thrive with your creativity!</p>
                    </section>
                    <AddTemplatePageForm />
                </> : (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-lg">Please sign in to add a template</p>
                    </div>
                )}
        </div>
    );
}