"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  Clock,
  ExternalLink,
} from "lucide-react";

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
}: {
  place: PlaceDetails;
  onReset: () => void;
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
        <div className="pt-4">
          <button
            onClick={onReset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Search size={14} />
            Search again
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PlaceSearch() {
  const [input, setInput] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
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

  const handleSelect = useCallback((placeId: string) => {
    setSelectedPlaceId(placeId);
    setInput("");
  }, []);

  const handleReset = useCallback(() => {
    setSelectedPlaceId(null);
    setInput("");
  }, []);

  if (selectedPlaceId) {
    if (isFetchingDetails || !placeDetails) {
      return <DetailSkeleton />;
    }
    return <DetailCard place={placeDetails} onReset={handleReset} />;
  }

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
