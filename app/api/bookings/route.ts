import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.itineraryId || !body.guestEmail || !body.guestName) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      ok: true,
      bookingId: `book-${Date.now()}`,
      message: "Booking received. Confirmation will be sent to your email.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
