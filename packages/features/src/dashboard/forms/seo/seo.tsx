"use client";

import { z } from "zod";

import { SeoResponseDto, UpsertSeoBodyDto } from "@icat/contracts";
import {
  Autocomplete,
  Input,
  Label,
  Textarea,
} from "@icat/ui";

export interface SeoFieldsProps {
  seo?: SeoResponseDto | null;
  errors?: z.ZodFormattedError<UpsertSeoBodyDto>;
}

export function SeoFields({ seo, errors }: SeoFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="seo.title">SEO Title</Label>
        <Input
          id="seo.title"
          placeholder="e.g. Rent Toyota Corolla in Islamabad"
          name="seo.title"
          defaultValue={seo?.title || ""}
          errors={errors?.title?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo.description">Meta Description</Label>
        <Textarea
          id="seo.description"
          placeholder="Concise summary for search results..."
          name="seo.description"
          defaultValue={seo?.description || ""}
          rows={4}
          errors={errors?.description?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo.keywords">Keywords</Label>
        <Autocomplete
          id="seo.keywords"
          name="seo.keywords"
          placeholder="Type and press enter to add keywords"
          options={[]}
          defaultValue={seo?.keywords || []}
          creatable
          errors={errors?.keywords?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo.ogImage">OG Image URL</Label>
        <Input
          id="seo.ogImage"
          placeholder="https://example.com/image.jpg"
          name="seo.ogImage"
          defaultValue={seo?.ogImage || ""}
          errors={errors?.ogImage?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo.canonicalUrl">Canonical URL</Label>
        <Input
          id="seo.canonicalUrl"
          placeholder="https://yourwebsite.com/cars/..."
          name="seo.canonicalUrl"
          defaultValue={seo?.canonicalUrl || ""}
          errors={errors?.canonicalUrl?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo.robots">Robots</Label>
        <Input
          id="seo.robots"
          placeholder="index, follow"
          name="seo.robots"
          defaultValue={seo?.robots || "index, follow"}
          errors={errors?.robots?._errors}
        />
      </div>
    </div>
  );
}
