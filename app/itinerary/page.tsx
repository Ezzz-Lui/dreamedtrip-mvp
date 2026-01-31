"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Itinerary } from "@/lib/types/itinerary";
import { getItineraryFromStorage } from "@/lib/api/itinerary";
import { getLatestItinerary } from "@/lib/api/itinerary";
import { ItineraryMap } from "@/components/map/ItineraryMap";
import { ItineraryTimeline } from "@/components/itinerary/ItineraryTimeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, DollarSign, ChevronUp, Map as MapIcon, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingGenie } from "@/components/ui/loading-genie";

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
        <div className="mx-auto max-w-7xl">
          <LoadingGenie message="Loading your itinerary..." size="lg" />
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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
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

        <Tabs defaultValue="map" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="map" className="gap-2">
                <MapIcon className="size-4" />
                Map View
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <List className="size-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
            
            <Card className="hidden lg:block">
              <CardContent className="flex items-center gap-4 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>{totalDays} day{totalDays !== 1 ? "s" : ""}</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <span>~${totalCost} total</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="map" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <div className="h-[500px] sm:h-[600px] w-full overflow-hidden rounded-lg border shadow-lg">
                  <ItineraryMap 
                    itinerary={itinerary} 
                    selectedStopId={selectedStopId}
                    onStopSelect={(stop) => setSelectedStopId(stop.placeId)}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Click on markers to see stop details. To reserve transport, accommodation and activities, use the paid tier.
                </p>
              </div>

              <div className="hidden lg:block">
                <ScrollArea className="h-[calc(100vh-240px)]">
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
                              className={cn(
                                "flex items-start gap-2 rounded-md border p-2 text-sm cursor-pointer transition-colors hover:bg-muted/50",
                                selectedStopId === stop.placeId && "bg-primary/10 border-primary"
                              )}
                              onClick={() => setSelectedStopId(stop.placeId)}
                            >
                              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{stop.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {STOP_TYPE_LABELS[stop.type] ?? stop.type}
                                  {stop.price != null && ` · ~$${stop.price}`}
                                  {stop.duration != null && ` · ${stop.duration} min`}
                                </p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <div className="mx-auto max-w-4xl">
              <ItineraryTimeline 
                itinerary={itinerary}
                selectedStopId={selectedStopId}
                onStopSelect={setSelectedStopId}
              />
            </div>
          </TabsContent>
        </Tabs>

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
                            className={cn(
                              "flex items-start gap-2 rounded-md border p-2 text-sm"
                            )}
                          >
                            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{stop.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {STOP_TYPE_LABELS[stop.type] ?? stop.type}
                                {stop.price != null && ` · ~$${stop.price}`}
                                {stop.duration != null && ` · ${stop.duration} min`}
                              </p>
                            </div>
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
          <div className="mx-auto max-w-7xl">
            <LoadingGenie message="Loading your itinerary..." size="lg" />
          </div>
        </div>
      }
    >
      <ItineraryPageContent />
    </Suspense>
  );
}
