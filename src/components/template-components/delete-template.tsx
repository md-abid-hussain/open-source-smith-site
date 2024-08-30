'use client'
import { useState } from "react";
import { Button } from "../ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

interface DeleteTemplateProp {
    id: string
}

export default function DeleteTemplate(
    { id }: DeleteTemplateProp
) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleDelete = async () => {
        const response = await fetch(`/api/templates/${id}`, {
            method: "DELETE",
            cache: "no-cache",
        })

        if (response.ok) {
            setSuccess("Template deleted successfully");
            router.push("/templates");
        } else {
            const data = await response.json();
            setError(data.error);
        }
    }

    return (
        <section>

            {success && (
                <Alert
                    className="bg-green-500 text-white absolute top-0 right-5  max-w-[300px] break-words whitespace-pre-wrap"
                    variant="default"
                >
                    <AlertTitle className="text-sm">{success}</AlertTitle>
                </Alert>
            )}

            {error && (
                <Alert
                    className="bg-red-500 text-white absolute right-5 top-0 max-w-[300px] break-words whitespace-pre-wrap"
                    variant="default"
                >
                    <AlertTitle className="text-sm">{error}</AlertTitle>
                </Alert>
            )}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Delete Template</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your template.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel type="submit">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>

    )
}