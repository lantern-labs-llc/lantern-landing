"use client";

import { useState } from "react";
import { useForm, useFieldArray, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Plus, Trash2, Loader2, Check } from "lucide-react";

// ─── Schema ──────────────────────────────────────────────────

const hoursSchema = z.object({
  day: z.string(),
  open: z.string(),
  close: z.string(),
  closed: z.boolean().optional(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const formSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  name: z.string().min(1, "Name is required"),
  tagline: z.string(),
  description: z.string(),
  heroSubtitle: z.string().nullable(),
  category: z.string().nullable(),
  owner: z.string(),
  ownerTitle: z.string().nullable(),
  ownerCredentials: z.string().nullable(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  phone: z.string(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  bookingUrl: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  rating: z.number().nullable(),
  reviewCount: z.number().nullable(),
  hours: z.array(hoursSchema),
  parking: z.string().nullable(),
  founded: z.string().nullable(),
  aboutSections: z.array(z.string()),
  differentiators: z.array(z.object({ title: z.string(), text: z.string() })),
  infoFacts: z.array(z.object({ label: z.string(), value: z.string() })),
  infoFaqs: z.array(faqSchema),
  faqs: z.array(faqSchema),
  trustSignals: z.array(
    z.object({ icon: z.string(), title: z.string(), detail: z.string() }),
  ),
  howItWorks: z.array(
    z.object({ title: z.string(), description: z.string() }),
  ),
  reviews: z.array(z.any()),
  lpServiceCards: z.array(z.any()),
  lpTrustItems: z.array(z.any()),
  lpBookingSteps: z.array(z.any()),
});

type FormData = z.infer<typeof formSchema>;

// ─── Helpers ─────────────────────────────────────────────────

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
        {label}
      </Label>
      {children}
    </div>
  );
}

// ─── Tab: Basics ─────────────────────────────────────────────

function BasicsTab({ form }: { form: UseFormReturn<FormData> }) {
  const { register } = form;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Business Name">
          <Input {...register("name")} />
        </Field>
        <Field label="Slug">
          <Input {...register("slug")} />
        </Field>
      </div>
      <Field label="Tagline">
        <Input {...register("tagline")} />
      </Field>
      <Field label="Description">
        <Textarea {...register("description")} rows={3} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <Input {...register("category")} />
        </Field>
        <Field label="Hero Subtitle">
          <Input {...register("heroSubtitle")} />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Owner Name">
          <Input {...register("owner")} />
        </Field>
        <Field label="Owner Title">
          <Input {...register("ownerTitle")} />
        </Field>
        <Field label="Owner Credentials">
          <Input {...register("ownerCredentials")} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Parking">
          <Input {...register("parking")} />
        </Field>
        <Field label="Founded">
          <Input {...register("founded")} />
        </Field>
      </div>
    </div>
  );
}

// ─── Tab: Contact ────────────────────────────────────────────

function ContactTab({ form }: { form: UseFormReturn<FormData> }) {
  const { register, control } = form;
  const hours = useFieldArray({ control, name: "hours" });

  return (
    <div className="space-y-4">
      <Field label="Address">
        <Input {...register("address")} />
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="City">
          <Input {...register("city")} />
        </Field>
        <Field label="State">
          <Input {...register("state")} />
        </Field>
        <Field label="ZIP">
          <Input {...register("zip")} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone">
          <Input {...register("phone")} />
        </Field>
        <Field label="Email">
          <Input {...register("email")} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Website">
          <Input {...register("website")} />
        </Field>
        <Field label="Booking URL">
          <Input {...register("bookingUrl")} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Latitude">
          <Input
            type="number"
            step="any"
            {...register("latitude", { valueAsNumber: true })}
          />
        </Field>
        <Field label="Longitude">
          <Input
            type="number"
            step="any"
            {...register("longitude", { valueAsNumber: true })}
          />
        </Field>
      </div>

      <div>
        <Label className="text-xs font-medium text-muted-foreground mb-2 block">
          Hours
        </Label>
        <div className="space-y-2">
          {hours.fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-[80px_1fr_1fr_32px] gap-2 items-center">
              <Input
                {...register(`hours.${i}.day`)}
                className="text-xs"
                readOnly
              />
              <Input
                {...register(`hours.${i}.open`)}
                placeholder="Open"
                className="text-xs"
              />
              <Input
                {...register(`hours.${i}.close`)}
                placeholder="Close"
                className="text-xs"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => hours.remove(i)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Content ────────────────────────────────────────────

function ContentTab({ form }: { form: UseFormReturn<FormData> }) {
  const { register, control } = form;
  const aboutSections = useFieldArray({
    control,
    // useFieldArray needs an array of objects, so we wrap strings
    name: "aboutSections" as never,
  });
  const differentiators = useFieldArray({ control, name: "differentiators" });
  const infoFacts = useFieldArray({ control, name: "infoFacts" });
  const trustSignals = useFieldArray({ control, name: "trustSignals" });
  const howItWorks = useFieldArray({ control, name: "howItWorks" });

  // For aboutSections (array of strings), watch the field
  const aboutValues: string[] = form.watch("aboutSections") || [];

  return (
    <div className="space-y-6">
      {/* About Sections */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs font-medium text-muted-foreground">
            About Sections
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const current = form.getValues("aboutSections");
              form.setValue("aboutSections", [...current, ""]);
            }}
          >
            <Plus size={14} className="mr-1" /> Add
          </Button>
        </div>
        {aboutValues.map((_, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Textarea
              {...register(`aboutSections.${i}`)}
              rows={3}
              className="text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 mt-1"
              onClick={() => {
                const current = form.getValues("aboutSections");
                form.setValue(
                  "aboutSections",
                  current.filter((_, idx) => idx !== i),
                );
              }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>

      {/* Differentiators */}
      <ArraySection
        label="Differentiators"
        fields={differentiators.fields}
        onAdd={() => differentiators.append({ title: "", text: "" })}
      >
        {differentiators.fields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-[1fr_2fr_32px] gap-2 items-start">
            <Input
              {...register(`differentiators.${i}.title`)}
              placeholder="Title"
              className="text-sm"
            />
            <Textarea
              {...register(`differentiators.${i}.text`)}
              placeholder="Description"
              rows={2}
              className="text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 mt-1"
              onClick={() => differentiators.remove(i)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </ArraySection>

      {/* Info Facts */}
      <ArraySection
        label="Info Facts"
        fields={infoFacts.fields}
        onAdd={() => infoFacts.append({ label: "", value: "" })}
      >
        {infoFacts.fields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_32px] gap-2 items-center">
            <Input
              {...register(`infoFacts.${i}.label`)}
              placeholder="Label"
              className="text-sm"
            />
            <Input
              {...register(`infoFacts.${i}.value`)}
              placeholder="Value"
              className="text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => infoFacts.remove(i)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </ArraySection>

      {/* Trust Signals */}
      <ArraySection
        label="Trust Signals"
        fields={trustSignals.fields}
        onAdd={() =>
          trustSignals.append({ icon: "shield", title: "", detail: "" })
        }
      >
        {trustSignals.fields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-[80px_1fr_2fr_32px] gap-2 items-start">
            <Input
              {...register(`trustSignals.${i}.icon`)}
              placeholder="Icon"
              className="text-sm"
            />
            <Input
              {...register(`trustSignals.${i}.title`)}
              placeholder="Title"
              className="text-sm"
            />
            <Input
              {...register(`trustSignals.${i}.detail`)}
              placeholder="Detail"
              className="text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => trustSignals.remove(i)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </ArraySection>

      {/* How It Works */}
      <ArraySection
        label="How It Works"
        fields={howItWorks.fields}
        onAdd={() => howItWorks.append({ title: "", description: "" })}
      >
        {howItWorks.fields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-[1fr_2fr_32px] gap-2 items-start">
            <Input
              {...register(`howItWorks.${i}.title`)}
              placeholder="Step title"
              className="text-sm"
            />
            <Textarea
              {...register(`howItWorks.${i}.description`)}
              placeholder="Step description"
              rows={2}
              className="text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 mt-1"
              onClick={() => howItWorks.remove(i)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </ArraySection>
    </div>
  );
}

// ─── Tab: FAQs ───────────────────────────────────────────────

function FaqsTab({ form }: { form: UseFormReturn<FormData> }) {
  const { register, control } = form;
  const faqs = useFieldArray({ control, name: "faqs" });
  const infoFaqs = useFieldArray({ control, name: "infoFaqs" });

  return (
    <div className="space-y-6">
      <ArraySection
        label="General FAQs"
        fields={faqs.fields}
        onAdd={() => faqs.append({ question: "", answer: "" })}
      >
        {faqs.fields.map((field, i) => (
          <div key={field.id} className="space-y-1">
            <div className="flex gap-2">
              <Input
                {...register(`faqs.${i}.question`)}
                placeholder="Question"
                className="text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => faqs.remove(i)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
            <Textarea
              {...register(`faqs.${i}.answer`)}
              placeholder="Answer"
              rows={2}
              className="text-sm"
            />
          </div>
        ))}
      </ArraySection>

      <ArraySection
        label="Info Page FAQs"
        fields={infoFaqs.fields}
        onAdd={() => infoFaqs.append({ question: "", answer: "" })}
      >
        {infoFaqs.fields.map((field, i) => (
          <div key={field.id} className="space-y-1">
            <div className="flex gap-2">
              <Input
                {...register(`infoFaqs.${i}.question`)}
                placeholder="Question"
                className="text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => infoFaqs.remove(i)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
            <Textarea
              {...register(`infoFaqs.${i}.answer`)}
              placeholder="Answer"
              rows={2}
              className="text-sm"
            />
          </div>
        ))}
      </ArraySection>
    </div>
  );
}

// ─── Tab: Reviews & LP ───────────────────────────────────────

function ReviewsTab({ form }: { form: UseFormReturn<FormData> }) {
  const { register } = form;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Rating">
          <Input
            type="number"
            step="0.1"
            min="0"
            max="5"
            {...register("rating", { valueAsNumber: true })}
          />
        </Field>
        <Field label="Review Count">
          <Input
            type="number"
            {...register("reviewCount", { valueAsNumber: true })}
          />
        </Field>
      </div>
      <p className="text-xs text-muted-foreground">
        Reviews, LP service cards, LP trust items, and LP booking steps can be
        added after the business is created.
      </p>
    </div>
  );
}

// ─── Generic array section wrapper ───────────────────────────

function ArraySection({
  label,
  fields,
  onAdd,
  children,
}: {
  label: string;
  fields: { id: string }[];
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-xs font-medium text-muted-foreground">
          {label}{" "}
          <span className="text-muted-foreground/60">({fields.length})</span>
        </Label>
        <Button type="button" variant="ghost" size="sm" onClick={onAdd}>
          <Plus size={14} className="mr-1" /> Add
        </Button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ─── Main Form ───────────────────────────────────────────────

export type BusinessDraft = FormData;

export default function OnboardingForm({
  defaultValues,
  businessId,
}: {
  defaultValues: FormData;
  businessId: string;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`/api/admin/businesses/${businessId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      return res.json() as Promise<{ id: string; slug: string }>;
    },
    onSuccess: (data) => {
      setSaved(true);
      setTimeout(() => router.push(`/admin`), 1500);
      console.log("Updated business:", data.slug);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    saveMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit Business Draft</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basics">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews & LP</TabsTrigger>
            </TabsList>

            <TabsContent value="basics">
              <BasicsTab form={form} />
            </TabsContent>
            <TabsContent value="contact">
              <ContactTab form={form} />
            </TabsContent>
            <TabsContent value="content">
              <ContentTab form={form} />
            </TabsContent>
            <TabsContent value="faqs">
              <FaqsTab form={form} />
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewsTab form={form} />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="submit"
              disabled={saveMutation.isPending || saved}
            >
              {saveMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Check size={16} />
                  Saved! Redirecting...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            {saveMutation.isError && (
              <p className="text-sm text-destructive">
                {saveMutation.error.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
