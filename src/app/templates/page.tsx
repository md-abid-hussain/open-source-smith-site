import TemplateCard from "@/components/template-components/template-card";
import TemplatePageHeader from "@/components/template-components/template-page-header";
import prisma from "@/lib/db";
import { TemplateWithAuthor } from "@/lib/types";

export default async function TemplatePage() {
  let templates;
  let error

  try {
    templates = await prisma.template.findMany({
      include: {
        author: true,
      }
    })

  } catch (err) {
    error = JSON.stringify(err)
  }

  if (error) {

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

  if (templates) {
    return (
      <section className="p-4">
        <TemplatePageHeader />
        <div className="flex flex-wrap gap-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template as unknown as TemplateWithAuthor}
            />
          ))}
        </div>
      </section>
    );
  }


}



