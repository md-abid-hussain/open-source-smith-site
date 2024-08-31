'use client'
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

export default function CodeBlockWithCopyButton({ data }: { data: string }) {
    const code = `open-source-smith forge --from ${data}`
    return (
        <div className="flex items-center p-4 bg-foreground rounded-md">
            <pre className="text-background text-sm flex-1">
                <code>{code}</code>
            </pre>
            <Button
                onClick={() => copyToClipboard(code)}

            >
                <Copy size={20} />
            </Button>
        </div>
    )
};
