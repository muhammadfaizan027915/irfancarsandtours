"use client";

import { useActionState, useEffect } from "react";
import {
  AlertBox,
  Autocomplete,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
  Textarea,
  toast,
} from "@icat/ui";
import { cn } from "@icat/ui/lib/utils";
import { ChevronDown, Globe } from "lucide-react";

import { upsertCarSeo } from "@icat/web/actions";
import { useDisclosure } from "@icat/lib/hooks";
import { SeoFormProps } from "./seo.types";


export function SeoForm({ carId, seo }: SeoFormProps) {
  const [isOpenSeo, , , onToggleSeo] = useDisclosure(false);
  const [result, action, pending] = useActionState(upsertCarSeo, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("SEO settings updated successfully.", {
        position: "top-center",
      });
    }
  }, [success]);

  return (
    <div className="space-y-6 pt-4 border-t">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">SEO Enhancement</h2>
        <p className="text-muted-foreground">
          Optional: Boost your content&apos;s visibility in search engines.
        </p>
      </div>

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
                isOpenSeo && "rotate-180"
              )}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-6">
          <form action={action} className="space-y-6">
            {!success && error?.message && (
              <AlertBox
                key={error.status}
                variant="destructive"
                description={error?.message}
              />
            )}

            <input type="hidden" name="carId" value={carId} />

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

            <div className="space-y-2">
              <Label htmlFor="robots">Robots</Label>
              <Input
                id="robots"
                placeholder="index, follow"
                name="robots"
                defaultValue={seo?.robots || "index, follow"}
                errors={error?.cause?.robots?._errors}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={pending}>
              {pending ? "Saving..." : "Save SEO Settings"}
            </Button>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
