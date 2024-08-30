"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GeneratePage() {

    const [open, setOpen] = useState(false);


    useCopilotChatSuggestions({
        instructions:
            "You are specialize in generating steps for setting up a project template. Suggest some topic related to project setup or configurations",
        maxSuggestions: 5
    });

    return (
        <section className={`hero-height sm:hero-height-sm ${!open ? 'flex flex-col justify-center' : ''}`}>
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
                        {open ? "Close" : "Start Generating Steps"}
                    </Button>
                </div>
            </div>

            {open && <div className="relative p-4 border-2 m-2 rounded-md h-[700px] min-h-[95vh] w-[320px] min-w-[90%] mx-auto mb-4">
                <CopilotChat
                    className="min-h-full overflow-auto flex-col-reverse"
                    labels={{
                        title: "Generate Steps for Setting Up a Project Template",
                        initial: "Hi! 👋 What do you want to build today?",
                    }}
                    instructions={
                        "You are specialize in generating steps for setting up a project template. If user input is out of context, then reply with you are specialize in generating steps for setting up a project template. Also add suggestions for the user to ask for help. Also ask user if they want to want to add additional tools like linters, formatters, logger, etc. You can create readme, dockerfile, config files, github actions, and any other files that are required to setup for a standard project."
                    }
                />
            </div>}
        </section>
    );
}
