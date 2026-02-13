"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  Clock,
  ExternalLink,
  ArrowRight,
  Loader2,
  Bot,
} from "lucide-react";
import OnboardingForm, { type BusinessDraft } from "./OnboardingForm";

type Suggestion = {
  placeId: string;
  name: string;
  secondary: string;
};

type PlaceDetails = {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  ratingCount: number;
  googleMapsUrl: string;
  hours: string[];
  location: { latitude: number; longitude: number } | null;
  types: string[];
};

type Phase = "search" | "confirm" | "generating" | "form";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

async function fetchSuggestions(query: string): Promise<Suggestion[]> {
  const res = await fetch(
    `/api/places/autocomplete?query=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Autocomplete failed");
  return res.json();
}

async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const res = await fetch(`/api/places/${encodeURIComponent(placeId)}`);
  if (!res.ok) throw new Error("Place details failed");
  return res.json();
}

async function generateAndSave(
  place: PlaceDetails,
): Promise<{ draft: BusinessDraft; businessId: string }> {
  // Step 1: Generate AI content
  const genRes = await fetch("/api/admin/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });
  if (!genRes.ok) {
    const err = await genRes.json().catch(() => ({ error: "Generation failed" }));
    throw new Error(err.error || "Generation failed");
  }
  const draft: BusinessDraft = await genRes.json();

  // Step 2: Save to DB as draft
  const saveRes = await fetch("/api/admin/businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (!saveRes.ok) {
    const err = await saveRes.json().catch(() => ({ error: "Save failed" }));
    throw new Error(err.error || "Save failed");
  }
  const { id } = await saveRes.json();

  return { draft, businessId: id };
}

function DetailSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72 mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-20 w-full mt-2" />
      </CardContent>
    </Card>
  );
}

function DetailCard({
  place,
  onReset,
  onConfirm,
  isGenerating,
}: {
  place: PlaceDetails;
  onReset: () => void;
  onConfirm?: () => void;
  isGenerating?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{place.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <MapPin size={14} />
              {place.address}
            </p>
          </div>
          {place.rating !== null && (
            <div className="flex items-center gap-1 text-sm shrink-0">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{place.rating}</span>
              <span className="text-muted-foreground">
                ({place.ratingCount.toLocaleString()})
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {place.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-muted-foreground" />
            <a href={`tel:${place.phone}`} className="hover:underline">
              {place.phone}
            </a>
          </div>
        )}
        {place.website && (
          <div className="flex items-center gap-2 text-sm">
            <Globe size={14} className="text-muted-foreground" />
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary truncate max-w-xs"
            >
              {place.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </a>
          </div>
        )}
        {place.googleMapsUrl && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-muted-foreground" />
            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary inline-flex items-center gap-1"
            >
              View on Google Maps
              <ExternalLink size={12} />
            </a>
          </div>
        )}
        {place.hours.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium flex items-center gap-1.5 mb-2">
              <Clock size={14} className="text-muted-foreground" />
              Hours
            </p>
            <div className="grid gap-0.5 text-sm text-muted-foreground">
              {place.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {onConfirm && (
          <div className="pt-4 border-t space-y-3">
            <Button
              onClick={onConfirm}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating content...
                </>
              ) : (
                <>
                  Add business & fetch core data
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
            <button
              onClick={onReset}
              disabled={isGenerating}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 mx-auto disabled:opacity-50"
            >
              <Search size={14} />
              Search again
            </button>
          </div>
        )}

        {!onConfirm && (
          <div className="pt-4">
            <button
              onClick={onReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Search size={14} />
              Search again
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const PROGRESS_MESSAGES = [
  "Scraping website...",
  "Analyzing business data...",
  "Generating tagline & description...",
  "Building FAQs & trust signals...",
  "Finalizing content...",
];

function GeneratingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, PROGRESS_MESSAGES.length - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <style>{`
        @keyframes robot-dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          15% { transform: translateY(-6px) rotate(-8deg); }
          30% { transform: translateY(0) rotate(8deg); }
          45% { transform: translateY(-4px) rotate(-5deg); }
          60% { transform: translateY(0) rotate(5deg); }
          75% { transform: translateY(-6px) rotate(-8deg); }
          90% { transform: translateY(0) rotate(8deg); }
        }
        .robot-dance { animation: robot-dance 1.2s ease-in-out infinite; }
      `}</style>
      <CardContent className="py-12">
        <div className="flex flex-col items-center gap-4">
          <Bot size={36} className="robot-dance text-primary" />
          <div className="text-center">
            <p className="font-medium">Generating business content</p>
            <p className="text-sm text-muted-foreground mt-1">
              {PROGRESS_MESSAGES[messageIndex]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PlaceSearch() {
  const [input, setInput] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("search");
  const [draft, setDraft] = useState<BusinessDraft | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const debouncedInput = useDebounce(input, 300);

  const {
    data: suggestions = [],
    isFetching: isFetchingSuggestions,
  } = useQuery({
    queryKey: ["places-autocomplete", debouncedInput],
    queryFn: () => fetchSuggestions(debouncedInput),
    enabled: debouncedInput.length >= 2 && !selectedPlaceId,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: placeDetails,
    isFetching: isFetchingDetails,
  } = useQuery({
    queryKey: ["place-details", selectedPlaceId],
    queryFn: () => fetchPlaceDetails(selectedPlaceId!),
    enabled: !!selectedPlaceId,
    staleTime: 10 * 60 * 1000,
  });

  const generateMutation = useMutation({
    mutationFn: generateAndSave,
    onSuccess: ({ draft: d, businessId: id }) => {
      setDraft(d);
      setBusinessId(id);
      setPhase("form");
    },
  });

  const handleSelect = useCallback((placeId: string) => {
    setSelectedPlaceId(placeId);
    setInput("");
    setPhase("confirm");
  }, []);

  const handleReset = useCallback(() => {
    setSelectedPlaceId(null);
    setInput("");
    setPhase("search");
    setDraft(null);
    generateMutation.reset();
  }, [generateMutation]);

  const handleConfirm = useCallback(() => {
    if (!placeDetails) return;
    setPhase("generating");
    generateMutation.mutate(placeDetails);
  }, [placeDetails, generateMutation]);

  // Phase: form — show the editable onboarding form
  if (phase === "form" && draft && businessId) {
    return <OnboardingForm defaultValues={draft} businessId={businessId} />;
  }

  // Phase: generating — show progress UI
  if (phase === "generating" && !generateMutation.isError) {
    return <GeneratingState />;
  }

  // Phase: confirm — show detail card with confirm button
  if (selectedPlaceId && (phase === "confirm" || phase === "generating")) {
    if (isFetchingDetails || !placeDetails) {
      return <DetailSkeleton />;
    }

    return (
      <div className="space-y-4">
        <DetailCard
          place={placeDetails}
          onReset={handleReset}
          onConfirm={handleConfirm}
          isGenerating={generateMutation.isPending}
        />
        {generateMutation.isError && (
          <Card className="border-destructive">
            <CardContent className="py-4">
              <p className="text-sm text-destructive">
                {generateMutation.error.message}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleConfirm}
              >
                Try again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Phase: search — show search input
  return (
    <Command shouldFilter={false} className="rounded-lg border bg-background">
      <CommandInput
        placeholder="Search for a business..."
        value={input}
        onValueChange={setInput}
      />
      <CommandList>
        {debouncedInput.length >= 2 &&
          !isFetchingSuggestions &&
          suggestions.length === 0 && (
            <CommandEmpty>No businesses found.</CommandEmpty>
          )}
        {suggestions.length > 0 && (
          <CommandGroup>
            {suggestions.map((s) => (
              <CommandItem
                key={s.placeId}
                value={s.placeId}
                onSelect={() => handleSelect(s.placeId)}
                className="cursor-pointer"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.secondary}
                  </p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
