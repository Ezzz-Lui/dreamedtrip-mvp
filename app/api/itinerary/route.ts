import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { TravelerProfile } from "@/lib/types/traveler";
import type { Itinerary } from "@/lib/types/itinerary";
import { buildMockItinerary } from "@/lib/itinerary-mock";

/**
 * POST: Either (1) persist itinerary to DB when user is logged in (body: { itinerary }),
 * or (2) return mock itinerary from profile (body: TravelerProfile).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Persist itinerary when user is logged in
    if (body?.itinerary && Array.isArray(body.itinerary.days) && body.itinerary.summary) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const itinerary = body.itinerary as Itinerary;
      const { data: row, error } = await supabase
        .from("itineraries")
        .insert({
          user_id: user.id,
          days: itinerary.days,
          summary: itinerary.summary,
        })
        .select("id")
        .single();
      if (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, itineraryId: row.id, itinerary: { ...itinerary, id: row.id } });
    }

    // Fallback: mock from profile (no auth required)
    const profile = body as TravelerProfile;
    if (
      !profile.destinationType ||
      profile.days == null ||
      !profile.budget ||
      !profile.party ||
      !profile.pace ||
      !Array.isArray(profile.interests)
    ) {
      return NextResponse.json(
        { message: "Invalid profile" },
        { status: 400 }
      );
    }
    const itinerary = buildMockItinerary(profile);
    return NextResponse.json({ itinerary });
  } catch {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}
