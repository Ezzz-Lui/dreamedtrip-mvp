import { NextResponse } from "next/server";

export async function GET() {
  // No persisted session in MVP: client uses localStorage for latest
  return NextResponse.json(
    { message: "No latest itinerary" },
    { status: 404 }
  );
}
