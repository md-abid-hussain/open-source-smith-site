import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { TemplateWithAuthor } from "@/lib/types";
import { Badge } from '@/components/ui/badge';
import Link from "next/link";

interface TemplateCardProps {
  template: TemplateWithAuthor
}

export default function TemplateCard({
  template }: TemplateCardProps) {
  const { id, name, description, author, githubUrl, tags, defaultBranch, templateType, subtype } = template;
  return (
    <div className="p-4 shadow rounded-md flex flex-col gap-4 dark:shadow-slate-500 max-w-[400px] min-w-full border">
      <Link href={`/templates/id/${id}`}><h3 className="font-bold text-lg">{name}</h3></Link>
      <Link className="flex gap-2 items-center" href={`/user/${author.id}`}>
        <Avatar>
          <AvatarImage src={author.image} alt="@shadcn" />
          <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <span>{author.name}</span>
      </Link>
      <p>{description}</p>
      <div className="flex ">
        <span>Tags:</span>
        <span className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} className="ml-2">{tag}</Badge>
          ))}
        </span>
      </div>
      <div>
        <span>Template Type:</span>
        <span className="ml-2 text-sm text-muted-foreground">{templateType}</span>
      </div>
      <div>
        <span>Sub Type:</span>
        <span className="ml-2 text-sm text-muted-foreground">{subtype}</span>
      </div>
      <div className="flex gap-4 mt-auto">
        <Link className="flex-1" href={githubUrl} target="_blank">
          <Button className="w-full">View</Button>
        </Link>
        <Link className="flex-1" target="_blank" href={`${githubUrl}/archive/refs/heads/${defaultBranch}.zip`}><Button className="w-full">Download</Button></Link>
      </div>
    </div>
  );
}

