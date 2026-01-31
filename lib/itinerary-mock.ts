/**
 * Server-safe mock itinerary builder. Used by API route and client fallback.
 */

import type { TravelerProfile } from "@/lib/types/traveler";
import type { Day, Itinerary, Stop } from "@/lib/types/itinerary";

export function buildMockItinerary(profile: TravelerProfile): Itinerary {
  const daysCount = Math.min(Math.max(profile.days, 1), 7);
  const days: Day[] = [];
  const baseLat = 40.4168;
  const baseLng = -3.7038;
  const stopTemplates: Omit<Stop, "placeId" | "lat" | "lng">[] = [
    { name: "Hotel Central", type: "hotel", price: 120, duration: 0, description: "Check-in" },
    { name: "Café del Sol", type: "restaurant", price: 15, duration: 60, description: "Breakfast" },
    { name: "Museum of Arts", type: "attraction", price: 12, duration: 120, description: "Main exhibition" },
    { name: "Local Bistro", type: "restaurant", price: 35, duration: 90, description: "Lunch" },
    { name: "Old Town Walk", type: "activity", price: 0, duration: 90, description: "Guided walk" },
    { name: "Sunset Terrace", type: "restaurant", price: 25, duration: 60, description: "Dinner" },
  ];
  const multiplier = profile.budget === "premium" ? 1.8 : profile.budget === "mid" ? 1.2 : 0.9;
  let totalCost = 0;

  for (let d = 0; d < daysCount; d++) {
    const numStops = 4 + (d % 2);
    const stops: Stop[] = stopTemplates.slice(0, numStops).map((s, i) => {
      const price = Math.round((s.price ?? 0) * multiplier);
      totalCost += price;
      return {
        ...s,
        placeId: `stop-${d}-${i}`,
        lat: baseLat + (d * 0.01) + (i * 0.002),
        lng: baseLng + (i * 0.01),
        price,
        startTime: i === 0 ? "10:00" : `${8 + i}:00`,
        endTime: i === 0 ? undefined : `${10 + i}:00`,
      };
    });
    days.push({
      date: new Date(Date.now() + d * 86400000).toISOString().slice(0, 10),
      dayIndex: d + 1,
      stops,
      transportBetweenStops: stops.slice(0, -1).map((_, i) => ({
        fromStopId: stops[i].placeId,
        toStopId: stops[i + 1].placeId,
        mode: "walk",
        durationMinutes: 10,
        price: 0,
      })),
    });
  }

  return {
    id: `mock-${Date.now()}`,
    days,
    summary: {
      totalEstimatedCost: totalCost,
      totalDays: daysCount,
      destinationLabel: "Sample City",
    },
  };
}
