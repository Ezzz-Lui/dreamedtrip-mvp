import { z } from "zod";
import {
  CENTRAL_AMERICA_COUNTRIES,
  DESTINATION_TYPES,
  BUDGET_LEVELS,
  TRAVEL_PARTY,
  PACE_OPTIONS,
  INTERESTS,
} from "@/lib/types/traveler";

export const travelerProfileSchema = z.object({
  country: z.enum(CENTRAL_AMERICA_COUNTRIES),
  destinationType: z.enum(DESTINATION_TYPES),
  days: z.number().min(1).max(14),
  budget: z.enum(BUDGET_LEVELS),
  party: z.enum(TRAVEL_PARTY),
  pace: z.enum(PACE_OPTIONS),
  interests: z.array(z.enum(INTERESTS)).min(1, "Select at least one interest"),
});

export type TravelerProfileSchema = z.infer<typeof travelerProfileSchema>;
