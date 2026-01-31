/**
 * Itinerary and stop types for DreamedTrip map and booking.
 */

export const STOP_TYPES = [
  "hotel",
  "restaurant",
  "activity",
  "attraction",
  "transport",
  "guide",
] as const;
export type StopType = (typeof STOP_TYPES)[number];

export interface Stop {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  type: StopType;
  price?: number;
  duration?: number; // minutes
  description?: string;
  startTime?: string; // ISO or "09:00"
  endTime?: string;
}

export interface TransportSegment {
  fromStopId: string;
  toStopId: string;
  mode: string; // "walk", "taxi", "transit", etc.
  durationMinutes?: number;
  price?: number;
}

export interface Day {
  date: string; // ISO date
  dayIndex: number;
  stops: Stop[];
  transportBetweenStops: TransportSegment[];
}

export interface ItinerarySummary {
  totalEstimatedCost: number;
  totalDays: number;
  destinationLabel?: string;
}

export interface Itinerary {
  id: string;
  days: Day[];
  summary: ItinerarySummary;
  profileId?: string;
  createdAt?: string;
}
