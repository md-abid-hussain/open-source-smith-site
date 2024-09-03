"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const introMessage = `Hi! 👋 What do you want to build today?

I specialize in generating steps for setting up a project template. Here are a few things I can help you with:
- Creating a README file
- Setting up a Dockerfile
- Configuring linters and formatters
- Adding a logger
- Setting up GitHub Actions for CI/CD
- Creating other necessary configuration files

If you have a specific project in mind, let me know the details! For example, you can ask for help with setting up a React project, a Node.js backend, or any other type of project.

Would you like to add additional tools like linters, formatters, or a logger to your project setup? Let me know how I can assist you further!`

export default function GeneratePage() {

    const [open, setOpen] = useState(false);


    useCopilotChatSuggestions({
        instructions:
            "You specialize in generating steps for setting up a project template. Please suggest some topics related to project setup or configurations, such as creating a README file, setting up a Dockerfile, configuring linters and formatters, adding a logger, setting up GitHub Actions for CI/CD, or creating other necessary configuration files.",
        maxSuggestions: 5
    });

    return (
        <section className={`${!open ? 'flex flex-col justify-center' : ''}`} style={{
            minHeight: "calc(100vh - 16rem)"
        }}>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Generate Steps for Setting Up a Project Template
                </h1>
                <p className="text-center text-muted-foreground sm:text-lg md:text-xl max-w-full w-[900px] mx-auto">
                    Not able to find the template for your project? Don&apos;t worry we
                    got your back. Use our AI to generate a customized project template
                    tailored to your needs. Just tell us what you want to build, and
                    we&apos;ll provide you with step-by-step instructions to get started
                    quickly and efficiently.
                </p>

                <div>
                    <Button
                        onClick={() => setOpen(prev => !prev)}
                        className="mt-4 mx-auto block"
                    >
                        {open ? "Stop Generating" : "Start Generating Steps"}
                    </Button>
                </div>
            </div>

            {open && <div className="relative border-2rounded-md">
                <CopilotChat
                    className="min-h-full overflow-auto flex-col-reverse mb-6"
                    labels={{
                        title: "Generate Steps for Setting Up a Project Template",
                        initial: introMessage,
                    }}
                    instructions={
                        "You are specialize in generating steps for setting up a project template. If user input is out of context, then reply with you are specialize in generating steps for setting up a project template. Also add suggestions for the user to ask for help. Also ask user if they want to want to add additional tools like linters, formatters, logger, etc. You can create readme, dockerfile, config files, github actions, and any other files that are required to setup for a standard project."
                    }
                />
            </div>}
        </section>
    );
}
