"use client";
import { FrontendSubType, BackendSubType, FullstackSubType, MiscellaneousSubType, Repository, TemplateType } from "@/lib/types";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useRouter } from "next/navigation";

const frontendSubTypes = Object.values(FrontendSubType);
const backendSubType = Object.values(BackendSubType);
const fullstackSubType = Object.values(FullstackSubType);

export default function AddTemplatePageForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
    const [githubUrl, setGithubUrl] = useState("");
    const [tagsError, setTagsError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [templateType, setTemplateType] = useState<TemplateType>()
    const [templateSubType, setTemplateSubType] = useState("")
    const [defaultBranch, setDefaultBranch] = useState("main")

    useEffect(() => {
        const fetchRepositories = async () => {
            const response = await fetch("/api/github", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setRepositories(data);
        };

        fetchRepositories();
    }, []);

    useEffect(() => {
        setTagsError(false);
        setError("");
    }, [tags, name, description, githubUrl, selectedRepository]);

    const handleSelectValueChange = (value: string) => {
        const repo: Repository = JSON.parse(value);
        setSelectedRepository(repo);
        setGithubUrl(repo.githubUrl);
        setDefaultBranch(repo.defaultBranch);

        if (repo.description) {
            setDescription(repo.description);
        }

        if (repo.name) {
            setName(repo.name);
        }
    };

    const handleAddTag = () => {
        if (tag.trim() === "") return;
        if (tags.includes(tag)) return;

        const tagToAdd = tag.split(/[\s,]+/).filter(t => t.trim() !== "");

        if (tagToAdd.length > 0) {
            setTags([...tags, ...tagToAdd]);
        }

        setTag("");
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            name,
            description,
            tags,
            githubUrl,
            templateType,
            templateSubType,
            repository: selectedRepository,
        };

        if (tags.length === 0) {
            setTagsError(true);
            return;
        }

        try {

            const response = await fetch("/api/templates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setName("");
                setDescription("");
                setTag("");
                setTags([]);
                setGithubUrl("");
                setSelectedRepository(null);
                setSuccess(true);

                setTimeout(() => {
                    router.push("/templates");
                }, 200);
            } else {
                const responseBody = await response.json();
                setError(responseBody.error);
            }
        } catch (error) {
            setError(JSON.stringify(error));
        }
    };

    return (
        <section className="p-4 relative">
            {success && (
                <Alert
                    variant="default"
                    className="bg-green-600 text-white absolute right-5 -top-32 max-w-[300px]"
                >
                    <AlertTitle>Success</AlertTitle>
                </Alert>
            )}

            {error && (
                <Alert
                    className="bg-red-500 text-white absolute right-5 -top-32 max-w-[300px] break-words whitespace-pre-wrap"
                    variant="default"
                >
                    <AlertTitle className="text-sm">{error}</AlertTitle>
                </Alert>
            )}

            <form
                className="min-w-[300px] max-w-[700px] flex flex-col mx-auto"
                onSubmit={handleSubmit}
            >
                <Select
                    required
                    onValueChange={(value) => handleSelectValueChange(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select template from github" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {repositories.length > 0 ? (
                                repositories.map((repo, index) => (
                                    <SelectItem
                                        className="font-semibold"
                                        key={repo.id}
                                        value={JSON.stringify(repo)}
                                    >
                                        {repo.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectLabel>No repositories found</SelectLabel>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Label className="text-lg mb-2 mt-4">Name</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the name of the template"
                    required
                />
                <Label className="text-lg mb-2 mt-4">Description</Label>
                <Textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description explaining the use and purpose of the template"
                    required
                />
                <Label className="text-lg mb-2 mt-4">Tags</Label>
                <div className="flex gap-4">
                    <Input
                        type="text"
                        name="tag"
                        id="tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Enter tags separated by space"
                    />
                    <Button type="button" onClick={handleAddTag}>
                        Add Tag
                    </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                        <Badge
                            className="hover:cursor-pointer mt-2"
                            onClick={() => handleRemoveTag(index)}
                            key={index}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                {tagsError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Tags are required for the template
                        </AlertDescription>
                    </Alert>
                )}

                <Label className="text-lg mb-2 mt-4">Template Type</Label>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <Select
                        required
                        onValueChange={(value) => setTemplateType(value as TemplateType)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select template type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={TemplateType.FRONTEND}>
                                    Frontend
                                </SelectItem>
                                <SelectItem value={TemplateType.BACKEND}>
                                    Backend
                                </SelectItem>
                                <SelectItem value={TemplateType.FULLSTACK}>
                                    Fullstack
                                </SelectItem>
                                <SelectItem value={TemplateType.MISCELLANEOUS}>
                                    Miscellaneous
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select required onValueChange={(value) => setTemplateSubType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select template subtype" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {templateType === TemplateType.FRONTEND && (
                                    <>
                                        {frontendSubTypes.map(subType => (
                                            <SelectItem key={subType} value={subType}>
                                                {subType.charAt(0) + subType.slice(1).toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </>
                                )}
                                {templateType === TemplateType.BACKEND && (
                                    <>
                                        {backendSubType.map(subType => (
                                            <SelectItem key={subType} value={subType}>
                                                {subType.charAt(0) + subType.slice(1).toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </>
                                )}
                                {templateType === TemplateType.FULLSTACK && (
                                    <>
                                        {fullstackSubType.map(subType => (
                                            <SelectItem key={subType} value={subType}>
                                                {subType.charAt(0) + subType.slice(1).toLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </>
                                )}
                                {templateType === TemplateType.MISCELLANEOUS && (
                                    <>
                                        <SelectItem value={MiscellaneousSubType.DOCKER}>
                                            Docker
                                        </SelectItem>
                                        <SelectItem value={MiscellaneousSubType.KUBERNETES}>
                                            Kubernetes
                                        </SelectItem>
                                        <SelectItem value={MiscellaneousSubType.OTHER}>
                                            Other
                                        </SelectItem>
                                    </>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>

                <Label className="text-lg mb-2 mt-4">Github URL</Label>

                <Input
                    type="text"
                    name="githubUrl"
                    id="githubUrl"
                    value={githubUrl || ""}
                    disabled
                    className="flex-1"
                />
                <Label className="text-lg mb-2 mt-4">Default Branch</Label>
                <Input type="text" name="defaultBranch" id="defaultBranch" value={defaultBranch || "main"} disabled className="flex-grow-0 max-w-fit" />

                <Button type="submit" className="mt-4">
                    Submit
                </Button>
            </form>
        </section>
    );
}