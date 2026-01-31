"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Itinerary, Day, Stop } from "@/lib/types/itinerary";
import { getItineraryFromStorage, getLatestItinerary, saveItineraryToStorage } from "@/lib/api/itinerary";
import { ItineraryMap } from "@/components/map/ItineraryMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Calendar, DollarSign, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Remove a stop from the itinerary and recalculate summary. Returns new itinerary or null if invalid. */
function removeStopFromItinerary(itinerary: Itinerary, dayIndex: number, placeId: string): Itinerary {
  const days: Day[] = itinerary.days.map((day) => {
    if (day.dayIndex !== dayIndex) return day;
    const stops = day.stops.filter((s) => s.placeId !== placeId);
    const transportBetweenStops = day.transportBetweenStops.filter(
      (t) => t.fromStopId !== placeId && t.toStopId !== placeId
    );
    return { ...day, stops, transportBetweenStops };
  });
  const daysWithStops = days.filter((d) => d.stops.length > 0);
  let totalEstimatedCost = 0;
  for (const day of daysWithStops) {
    for (const stop of day.stops) {
      if (stop.price != null) totalEstimatedCost += stop.price;
    }
    for (const seg of day.transportBetweenStops) {
      if (seg.price != null) totalEstimatedCost += seg.price;
    }
  }
  const summary = {
    ...itinerary.summary,
    totalEstimatedCost,
    totalDays: daysWithStops.length,
  };
  return { ...itinerary, days: daysWithStops, summary };
}

const STOP_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  activity: "Activity",
  attraction: "Attraction",
  transport: "Transport",
  guide: "Guide",
};

function ItineraryPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  const handleRemoveStop = useCallback((dayIndex: number, placeId: string) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const next = removeStopFromItinerary(prev, dayIndex, placeId);
      saveItineraryToStorage(next);
      return next;
    });
    setSelectedStopId((id) => (id === placeId ? null : id));
  }, []);

  useEffect(() => {
    const fromPlan = searchParams.get("from") === "plan";
    const stored = getItineraryFromStorage();
    if (stored) {
      setItinerary(stored);
      setLoading(false);
      return;
    }
    getLatestItinerary()
      .then((data) => {
        if (data) setItinerary(data);
        else router.replace("/plan");
      })
      .finally(() => setLoading(false));
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-6xl space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <p className="text-muted-foreground">
          Taking you to plan your trip…
        </p>
      </div>
    );
  }

  const totalCost = itinerary.summary.totalEstimatedCost;
  const totalDays = itinerary.summary.totalDays;
  const hasStops = itinerary.days.some((d) => d.stops.length > 0);

  if (!hasStops) {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-center">You have no stops left in your itinerary.</p>
        <Button asChild className="mt-4">
          <Link href="/plan">Edit plan to get a new itinerary</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Your itinerary
            </h1>
            <p className="text-muted-foreground">
              {totalDays} day{totalDays !== 1 ? "s" : ""} ·{" "}
              {itinerary.summary.destinationLabel ?? "Your trip"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/plan">Edit plan</Link>
              </Button>
              <Button asChild>
                <Link href={`/book?itineraryId=${itinerary.id}`}>
                  Reserve with DreamedTrip
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Paid — we secure transport, accommodation & activities.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-[400px] w-full overflow-hidden rounded-lg border">
              <ItineraryMap
                itinerary={itinerary}
                selectedStopId={selectedStopId}
                onStopSelect={(stop) => setSelectedStopId((id) => (id === stop.placeId ? null : stop.placeId))}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              To reserve transport, accommodation and activities with us, use
              the paid tier.
            </p>
          </div>

          <div className="hidden lg:block">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>{totalDays} day{totalDays !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <span>~${totalCost} estimated total</span>
                </div>
              </CardContent>
            </Card>
            <ScrollArea className="mt-4 h-[calc(100vh-320px)]">
              <div className="space-y-4 pr-2">
                {itinerary.days.map((day) => (
                  <Card key={day.dayIndex}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">
                        Day {day.dayIndex} · {day.date}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                        {day.stops.map((stop) => (
                        <div
                          key={stop.placeId}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedStopId((id) => (id === stop.placeId ? null : stop.placeId))}
                          onKeyDown={(e) => e.key === "Enter" && setSelectedStopId((id) => (id === stop.placeId ? null : stop.placeId))}
                          className={cn(
                            "flex cursor-pointer items-start gap-2 rounded-md border p-2 text-sm transition-colors hover:bg-muted/50",
                            selectedStopId === stop.placeId && "ring-2 ring-primary bg-muted/50"
                          )}
                        >
                          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{stop.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {STOP_TYPE_LABELS[stop.type] ?? stop.type}
                              {stop.price != null && ` · ~$${stop.price}`}
                              {stop.duration != null && ` · ${stop.duration} min`}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveStop(day.dayIndex, stop.placeId);
                            }}
                            aria-label={`Remove ${stop.name} from itinerary`}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <ChevronUp className="size-4" />
                View day-by-day stops
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Your stops</h2>
                <Button variant="ghost" size="sm" onClick={() => setSheetOpen(false)}>
                  Close
                </Button>
              </div>
              <ScrollArea className="h-[calc(70vh-80px)]">
                <div className="space-y-4 pb-8">
                  {itinerary.days.map((day) => (
                    <Card key={day.dayIndex}>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">
                          Day {day.dayIndex} · {day.date}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 pt-0">
                        {day.stops.map((stop) => (
                          <div
                            key={stop.placeId}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedStopId((id) => (id === stop.placeId ? null : stop.placeId))}
                            onKeyDown={(e) => e.key === "Enter" && setSelectedStopId((id) => (id === stop.placeId ? null : stop.placeId))}
                            className={cn(
                              "flex cursor-pointer items-start gap-2 rounded-md border p-2 text-sm transition-colors hover:bg-muted/50",
                              selectedStopId === stop.placeId && "ring-2 ring-primary bg-muted/50"
                            )}
                          >
                            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium">{stop.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {STOP_TYPE_LABELS[stop.type] ?? stop.type}
                                {stop.price != null && ` · ~$${stop.price}`}
                                {stop.duration != null && ` · ${stop.duration} min`}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveStop(day.dayIndex, stop.placeId);
                              }}
                              aria-label={`Remove ${stop.name} from itinerary`}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background p-4">
          <div className="mx-auto max-w-6xl space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      }
    >
      <ItineraryPageContent />
    </Suspense>
  );
}
