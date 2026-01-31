import { NextResponse } from "next/server";
import type { TravelerProfile } from "@/lib/types/traveler";

export async function GET() {
  // No auth in MVP: return 404 so client uses localStorage
  return NextResponse.json(
    { message: "No profile" },
    { status: 404 }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TravelerProfile;
    if (!body.country || !body.destinationType || !body.days || !body.budget || !body.party || !body.pace || !Array.isArray(body.interests)) {
      return NextResponse.json(
        { message: "Invalid profile" },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: true, profileId: "profile-1" });
  } catch {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}
