"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const US_STATES = [
  { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
  { value: "AS", label: "American Samoa" }, { value: "GU", label: "Guam" },
  { value: "MP", label: "Northern Mariana Islands" }, { value: "PR", label: "Puerto Rico" },
  { value: "VI", label: "U.S. Virgin Islands" },
];

export default function WaitlistPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: searchParams.get("email") || "",
    business: "",
    city: "",
    state: "",
    phone: "",
    note: "",
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "You're on the list!",
      description: "We'll reach out soon with early access details.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold tracking-wide uppercase text-accent">
                Limited Spots Available
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl mb-2">
              Join the <span className="italic text-gradient-lantern">Waitlist</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Tell us a bit about your business and we&apos;ll be in touch.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 bg-secondary/10 rounded-xl px-6 py-6 text-center"
            >
              <CheckCircle2 className="text-secondary shrink-0" size={22} />
              <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch soon.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Name *</label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    required
                    className="h-11 bg-card"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <Input
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={form.email}
                    onChange={update("email")}
                    required
                    className="h-11 bg-card"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Business Name *</label>
                <Input
                  placeholder="Your business name"
                  value={form.business}
                  onChange={update("business")}
                  required
                  className="h-11 bg-card"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">City *</label>
                  <Input
                    placeholder="City"
                    value={form.city}
                    onChange={update("city")}
                    required
                    className="h-11 bg-card"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">State *</label>
                  <Select value={form.state} onValueChange={(v) => setForm((f) => ({ ...f, state: v }))} required>
                    <SelectTrigger className="h-11 bg-card">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50 max-h-[300px]">
                      {US_STATES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Phone <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={update("phone")}
                  className="h-11 bg-card"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Note <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Textarea
                  placeholder="Anything you'd like us to know?"
                  value={form.note}
                  onChange={update("note")}
                  className="bg-card min-h-[80px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full shadow-lantern h-12 mt-2">
                Join Waitlist
                <ArrowRight size={16} className="ml-2" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                No spam. No commitments. Just early access.
              </p>
            </form>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
