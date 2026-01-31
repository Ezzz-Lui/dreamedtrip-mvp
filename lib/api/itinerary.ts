/**
 * Itinerary API client. POST with profile to get recommendation; mock used when backend unavailable.
 */

import type { TravelerProfile } from "@/lib/types/traveler";
import type { Itinerary } from "@/lib/types/itinerary";
import { buildMockItinerary } from "@/lib/itinerary-mock";
import { apiFetch } from "./client";

const ITINERARY_STORAGE_KEY = "dreamedtrip_itinerary";

export async function getItineraryFromProfile(
  profile: TravelerProfile
): Promise<Itinerary> {
  // Prefer AI-generated itinerary (real destinations) when API key is set
  try {
    const res = await apiFetch<{ itinerary: Itinerary }>("/itinerary/generate", {
      method: "POST",
      body: JSON.stringify(profile),
    });
    if (res?.itinerary?.days?.length) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(res.itinerary));
      }
      return res.itinerary as Itinerary;
    }
  } catch {
    // Fallback to server mock or client mock
  }
  try {
    const res = await apiFetch<{ itinerary: Itinerary }>("/itinerary", {
      method: "POST",
      body: JSON.stringify(profile),
    });
    if (res?.itinerary) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(res.itinerary));
      }
      return res.itinerary;
    }
  } catch {
    // Fallback to client mock
  }
  const mock = buildMockItinerary(profile);
  if (typeof window !== "undefined") {
    localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(mock));
  }
  return mock;
}

/**
 * Persist itinerary to DB when user is logged in. Returns the saved itinerary with DB id.
 */
export async function saveItinerary(itinerary: Itinerary): Promise<Itinerary | null> {
  try {
    const res = await apiFetch<{ ok: boolean; itineraryId: string; itinerary?: Itinerary }>(
      "/itinerary",
      {
        method: "POST",
        body: JSON.stringify({ itinerary }),
      }
    );
    if (res?.ok && res?.itinerary) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(res.itinerary));
      }
      return res.itinerary;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getLatestItinerary(): Promise<Itinerary | null> {
  try {
    const res = await apiFetch<{ itinerary: Itinerary }>("/itinerary/latest", {
      method: "GET",
    });
    return res.itinerary ?? null;
  } catch {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(ITINERARY_STORAGE_KEY);
      if (raw) {
        try {
          return JSON.parse(raw) as Itinerary;
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}

export function getItineraryFromStorage(): Itinerary | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ITINERARY_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Itinerary;
  } catch {
    return null;
  }
}

/** Persist edited itinerary to localStorage so map and list stay in sync. */
export function saveItineraryToStorage(itinerary: Itinerary): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(itinerary));
}
