"use client";

import { ChevronDown, Globe, Search } from "lucide-react";
import { useActionState, useEffect } from "react";

import { useDisclosure } from "@icat/lib/hooks";
import { mergeObjectToFormData } from "@icat/lib/utils";
import {
  AlertBox,
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
  Textarea,
  toast,
} from "@icat/ui";
import { cn } from "@icat/ui/lib/utils";
import { upsertCarSeo, upsertTourSeo } from "@icat/web/actions";

import { SeoFormProps } from "./seo.types";

export function SeoForm({ carId, tourId, seo }: SeoFormProps) {
  const [isOpenSeo, , , onToggleSeo] = useDisclosure(false);
  const targetAction = carId ? upsertCarSeo : upsertTourSeo;
  const [result, action, pending] = useActionState(targetAction, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (result?.success) {
      toast.success("SEO settings updated successfully.", {
        position: "top-center",
      });
    }
  }, [result]);

  const handleAction = (formData: FormData) => {
    const data: { carId?: string; tourId?: string } = {};
    if (carId) data.carId = carId;
    if (tourId) data.tourId = tourId;
    const mergedData = mergeObjectToFormData(formData, data);
    action(mergedData);
  };

  return (
    <Collapsible
      open={isOpenSeo}
      onOpenChange={onToggleSeo}
      className="border rounded-xl p-6 bg-primary/5 border-primary/20"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <Globe size={24} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Configure SEO Metadata</h3>
              <p className="text-sm text-muted-foreground">
                Title, Description, and Social Sharing preview.
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "size-5 transition-transform duration-200",
              isOpenSeo && "rotate-180",
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-6">
        <form action={handleAction} className="space-y-8">
          {!success && error?.message && (
            <AlertBox
              key={error.status}
              variant="destructive"
              description={error?.message}
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Search Metadata</h2>
            </div>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">SEO Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Rent Toyota Corolla in Islamabad"
                  name="title"
                  defaultValue={seo?.title || ""}
                  errors={error?.cause?.title?._errors}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  placeholder="Concise summary for search results..."
                  name="description"
                  defaultValue={seo?.description || ""}
                  rows={4}
                  className="resize-none"
                  errors={error?.cause?.description?._errors}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Autocomplete
                  id="keywords"
                  name="keywords"
                  placeholder="Type and press enter to add keywords"
                  options={[]}
                  defaultValue={seo?.keywords || []}
                  creatable
                  errors={error?.cause?.keywords?._errors}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-8">
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Indexing & URLs</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ogImage">OG Image URL</Label>
                <Input
                  id="ogImage"
                  placeholder="https://example.com/image.jpg"
                  name="ogImage"
                  defaultValue={seo?.ogImage || ""}
                  errors={error?.cause?.ogImage?._errors}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  placeholder="https://yourwebsite.com/cars/..."
                  name="canonicalUrl"
                  defaultValue={seo?.canonicalUrl || ""}
                  errors={error?.cause?.canonicalUrl?._errors}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="robots">Robots</Label>
                <Input
                  id="robots"
                  placeholder="index, follow"
                  name="robots"
                  defaultValue={seo?.robots || "index, follow"}
                  errors={error?.cause?.robots?._errors}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="px-12 font-bold shadow-lg group"
              disabled={pending}
            >
              {pending ? "Saving..." : "Save SEO Settings"}
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
