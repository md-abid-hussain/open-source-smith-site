import TemplateCard from "@/components/template-components/template-card";
import TemplatePageHeader from "@/components/template-components/template-page-header";
import { TemplateWithAuthor } from "@/lib/types";

export default async function TemplatePage() {
  const response = await fetch(process.env.NEXTAUTH_URL + "/api/templates", {
    method: "GET",
    cache: "no-cache"
  });

  let error;
  let templates: TemplateWithAuthor[] = [];

  if (!response.ok) {

    error = { message: "An error occurred while fetching the templates." };

    return (
      <section className="p-4">
        <TemplatePageHeader />
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-red-600">{error.message}</p>
        </div>
      </section>
    )
  }

  templates = await response.json();

  return (
    <section className="p-4">
      <TemplatePageHeader />
      <div className="flex flex-wrap gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
          />
        ))}
      </div>
    </section>
  );
}



