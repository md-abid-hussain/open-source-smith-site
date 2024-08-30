'use client'

import TemplateCard from "@/components/template-components/template-card";
import TemplatePageHeader from "@/components/template-components/template-page-header";
import { TemplateWithAuthor } from "@/lib/types";
import { useEffect, useState } from "react";

export default function TemplatePage() {
  const [templates, setTemplates] = useState<TemplateWithAuthor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`/api/templates`, { cache: "no-cache" });
        if (response.ok) {
          const templates: TemplateWithAuthor[] = await response.json();
          setTemplates(templates);
        } else {
          const error = await response.json();
          setError(JSON.stringify(error));
        }
      } catch (error) {
        setError(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [])

  let content;

  if (loading) {
    content = (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (error) {
    content = (
      <section className="p-4">
        <TemplatePageHeader />
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  content = (
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
  )

  return content;
}



