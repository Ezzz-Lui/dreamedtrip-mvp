"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign } from "lucide-react";
import type { Itinerary } from "@/lib/types/itinerary";
import { cn } from "@/lib/utils";

const STOP_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  activity: "Activity",
  attraction: "Attraction",
  transport: "Transport",
  guide: "Guide",
};

const STOP_TYPE_COLORS: Record<string, string> = {
  hotel: "bg-blue-500",
  restaurant: "bg-orange-500",
  activity: "bg-green-500",
  attraction: "bg-purple-500",
  transport: "bg-gray-500",
  guide: "bg-yellow-500",
};

interface ItineraryTimelineProps {
  itinerary: Itinerary;
  selectedStopId?: string | null;
  onStopSelect?: (placeId: string) => void;
}

export function ItineraryTimeline({ 
  itinerary, 
  selectedStopId,
  onStopSelect 
}: ItineraryTimelineProps) {
  return (
    <div className="space-y-8">
      {itinerary.days.map((day, dayIdx) => (
        <div key={day.dayIndex} className="relative">
          {/* Day header */}
          <div className="sticky top-16 z-10 bg-background/95 backdrop-blur pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {day.dayIndex}
              </div>
              <div>
                <h3 className="font-semibold text-lg">Day {day.dayIndex}</h3>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative ml-6 space-y-6 border-l-2 border-muted pl-8 pb-8">
            {day.stops.map((stop, stopIdx) => {
              const isSelected = selectedStopId === stop.placeId;
              const isLast = stopIdx === day.stops.length - 1;
              
              return (
                <div
                  key={stop.placeId}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div 
                    className={cn(
                      "absolute -left-[41px] top-2 size-6 rounded-full border-4 border-background transition-all",
                      STOP_TYPE_COLORS[stop.type] || "bg-gray-500",
                      isSelected && "ring-4 ring-primary/30 scale-125"
                    )}
                  />

                  {/* Stop card */}
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      isSelected && "ring-2 ring-primary shadow-lg"
                    )}
                    onClick={() => onStopSelect?.(stop.placeId)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-base leading-tight">
                            {stop.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {STOP_TYPE_LABELS[stop.type] ?? stop.type}
                            </Badge>
                          </div>
                        </div>
                        <MapPin className={cn(
                          "size-5 shrink-0 transition-colors",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                    </CardHeader>
                    
                    {(stop.price != null || stop.duration != null) && (
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          {stop.duration != null && (
                            <div className="flex items-center gap-1">
                              <Clock className="size-4" />
                              <span>{stop.duration} min</span>
                            </div>
                          )}
                          {stop.price != null && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="size-4" />
                              <span>~${stop.price}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Connector line animation */}
                  {!isLast && (
                    <div className="absolute -left-[37px] top-10 w-0.5 h-6 bg-gradient-to-b from-muted to-transparent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Day separator */}
          {dayIdx < itinerary.days.length - 1 && (
            <div className="flex items-center gap-4 my-8 ml-6">
              <div className="h-px flex-1 bg-gradient-to-r from-muted to-transparent" />
              <span className="text-xs text-muted-foreground font-medium">Next Day</span>
              <div className="h-px flex-1 bg-gradient-to-l from-muted to-transparent" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
