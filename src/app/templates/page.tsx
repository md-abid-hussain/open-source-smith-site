'use client'

import TemplateCard from "@/components/template-components/template-card";
import { TemplateType, TemplateWithAuthor } from "@/lib/types";
import { useEffect, useState, useDeferredValue, useCallback, useMemo } from "react";
import { debounce } from 'lodash'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export default function TemplatePage() {
  const [filter, setFilter] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [templateType, setTemplateType] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const deferredFilter = useDeferredValue(filter);
  const deferredTag = useDeferredValue(tag);

  const debouncedSetFilter = debounce((value: string) => {
    setFilter(value);
    setPage(1);
  }, 300)

  const debouncedSetTag = debounce((value: string) => {
    setTag(value);
    setPage(1);
  }, 300)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilter(e.target.value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetTag(e.target.value);
  };

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  return (
    <div className="template-list-height flex flex-col">
      <div className="mb-4 flex gap-4 flex-wrap w-[1200px] max-w-full ">
        <div>
          <Label className="mb-4">
            Filter by name
          </Label>
          <Input
            id="filter"
            type="text"
            placeholder="Enter template name"
            onChange={handleFilterChange}
            className="w-[300px]"
          />
        </div>
        <div>
          <Label className="mb-4" htmlFor="tag">
            Filter by tag
          </Label>
          <Input
            id="tag"
            type="text"
            placeholder="Enter tag"
            onChange={handleTagChange}
            className="w-[300px]"
          />
        </div>
        <div className="w-[300px]">
          <Label className="mb-4">
            Filter by template type
          </Label>
          <Select
            required
            onValueChange={(value) => setTemplateType(value as TemplateType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a template type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all" defaultChecked>
                  All
                </SelectItem>
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
        </div>
        <Separator />
      </div>
      <div className="flex-1">
        <TemplateList
          deferredFilter={deferredFilter}
          deferredTag={deferredTag}
          page={page}
          templateType={templateType}
          setTotalPages={setTotalPages}
        />
      </div>
      <Separator className="mt-4" />
      <div className="flex justify-between mt-6 items-center">
        <Button onClick={handlePreviousPage} disabled={page === 1} className="w-[84px] ">
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button onClick={handleNextPage} disabled={page === totalPages} className="w-[84px]">
          Next
        </Button>
      </div>
    </div>
  );
}

interface TemplateListProps {
  deferredFilter: string;
  deferredTag: string;
  page: number;
  templateType: string;
  setTotalPages: (totalPages: number) => void;
}



function TemplateList({ deferredFilter, deferredTag, page, templateType, setTotalPages }: TemplateListProps) {
  const [templates, setTemplates] = useState<TemplateWithAuthor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/templates?filter=${deferredFilter}&tag=${deferredTag}&page=${page}&templateType=${templateType}`, { cache: "no-cache" });
        if (response.ok) {
          const data = await response.json();
          setTemplates(data.templates);
          setTotalPages(data.totalPages);
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
  }, [deferredFilter, deferredTag, page, templateType, setTotalPages]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <p className="text-lg">Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      );
    }

    return (
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 pt-4 w-[1600px] max-w-full mx-auto">
        {templates.length > 0 ? templates.map((template) => (
          <div key={template.id} className="w-full flex">
            <TemplateCard
              template={template as unknown as TemplateWithAuthor}
            />
          </div>
        )) : (
          <p className="text-lg">No templates found</p>
        )}
      </div>
    );
  }, [loading, error, templates]);

  return content;
}