/**
 * Traveler profile API client. Persists profile to backend or localStorage when unauthenticated.
 */

import type { TravelerProfile, TravelerProfilePayload } from "@/lib/types/traveler";
import { apiFetch } from "./client";

const PROFILE_STORAGE_KEY = "dreamedtrip_traveler_profile";

export async function saveProfile(
  profile: TravelerProfile
): Promise<{ ok: boolean; profileId?: string }> {
  try {
    const payload: TravelerProfilePayload = { ...profile };
    const res = await apiFetch<{ ok: boolean; profileId?: string }>(
      "/profile",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res;
  } catch {
    // Fallback: persist in localStorage for unauthenticated users
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return { ok: true };
    }
    return { ok: false };
  }
}

export async function getProfile(): Promise<TravelerProfile | null> {
  try {
    const res = await apiFetch<{ profile: TravelerProfile }>("/profile", {
      method: "GET",
    });
    return res.profile ?? null;
  } catch {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (raw) {
        try {
          return JSON.parse(raw) as TravelerProfile;
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}

export function getProfileFromStorage(): TravelerProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TravelerProfile;
  } catch {
    return null;
  }
}
