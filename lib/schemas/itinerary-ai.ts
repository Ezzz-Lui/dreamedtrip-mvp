import { z } from "zod";
import { STOP_TYPES } from "@/lib/types/itinerary";

/**
 * Zod schema for AI-generated itinerary. Used with Vercel AI SDK generateObject.
 */
export const stopSchema = z.object({
  placeId: z.string().describe("Unique id, e.g. stop-dayIndex-index"),
  name: z.string().describe("Real place or attraction name"),
  lat: z.number().describe("Latitude (WGS84), must be inside the country"),
  lng: z.number().describe("Longitude (WGS84), must be inside the country"),
  type: z.enum(STOP_TYPES),
  price: z.number().optional().describe("Estimated cost in USD"),
  duration: z.number().optional().describe("Duration in minutes"),
  description: z.string().optional(),
  startTime: z.string().optional().describe("e.g. 09:00"),
  endTime: z.string().optional(),
});

export const transportSegmentSchema = z.object({
  fromStopId: z.string(),
  toStopId: z.string(),
  mode: z.string().describe("walk, taxi, transit, etc."),
  durationMinutes: z.number().optional(),
  price: z.number().optional(),
});

export const daySchema = z.object({
  date: z.string().describe("ISO date YYYY-MM-DD"),
  dayIndex: z.number(),
  stops: z.array(stopSchema),
  transportBetweenStops: z.array(transportSegmentSchema),
});

export const itinerarySummarySchema = z.object({
  totalEstimatedCost: z.number(),
  totalDays: z.number(),
  destinationLabel: z.string().optional(),
});

export const itineraryAiSchema = z.object({
  id: z.string().describe("e.g. ai-{timestamp}"),
  days: z.array(daySchema),
  summary: itinerarySummarySchema,
});

export type ItineraryAi = z.infer<typeof itineraryAiSchema>;
