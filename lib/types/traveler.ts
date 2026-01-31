/**
 * Traveler profile types for DreamedTrip questionnaire and API.
 */

export const DESTINATION_TYPES = [
  "city",
  "nature",
  "beach",
  "mixed",
] as const;
export type DestinationType = (typeof DESTINATION_TYPES)[number];

export const BUDGET_LEVELS = ["budget", "mid", "premium"] as const;
export type BudgetLevel = (typeof BUDGET_LEVELS)[number];

export const TRAVEL_PARTY = ["solo", "couple", "family", "friends"] as const;
export type TravelParty = (typeof TRAVEL_PARTY)[number];

export const PACE_OPTIONS = ["relaxed", "balanced", "intense"] as const;
export type Pace = (typeof PACE_OPTIONS)[number];

export const INTERESTS = [
  "food",
  "culture",
  "adventure",
  "relax",
  "photography",
  "nightlife",
  "shopping",
  "history",
] as const;
export type Interest = (typeof INTERESTS)[number];

export interface TravelerProfile {
  destinationType: DestinationType;
  days: number;
  budget: BudgetLevel;
  party: TravelParty;
  pace: Pace;
  interests: Interest[];
}

export interface TravelerProfilePayload extends TravelerProfile {
  userId?: string;
}
