import { NextResponse } from "next/server";
import type { TravelerProfile } from "@/lib/types/traveler";
import { buildMockItinerary } from "@/lib/itinerary-mock";

export async function POST(request: Request) {
  try {
    const profile = (await request.json()) as TravelerProfile;
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
