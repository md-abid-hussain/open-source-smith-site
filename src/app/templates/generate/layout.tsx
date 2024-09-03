import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenSourceSmith | Generate Steps for Setting Up a Project",
    description: "Can't find the right template for your project? Don't worry, we've got you covered. Use our AI to generate a customized project template tailored to your needs. Just tell us what you want to build, and we'll provide you with step-by-step instructions to get started quickly and efficiently. From README files to Dockerfiles, we've got everything you need.",
};

export default function GeneratePageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
        </CopilotKit>
    )
}