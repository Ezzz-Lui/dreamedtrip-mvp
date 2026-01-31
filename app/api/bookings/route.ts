import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      itinerary_id,
      guest_email,
      guest_name,
      status,
      created_at,
      itineraries ( days, summary )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ bookings: bookings ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.itineraryId || !body.guestEmail || !body.guestName) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: itineraryRow, error: itineraryError } = await supabase
      .from("itineraries")
      .select("id, days, summary")
      .eq("id", body.itineraryId)
      .eq("user_id", user.id)
      .single();
    if (itineraryError || !itineraryRow) {
      return NextResponse.json(
        { ok: false, message: "Itinerary not found or access denied" },
        { status: 404 }
      );
    }

    const days = (itineraryRow.days ?? []) as Array<{
      dayIndex: number;
      stops: Array<{ placeId: string; name: string; type: string }>;
    }>;
    const selectedStopIds = Array.isArray(body.selectedStopIds)
      ? (body.selectedStopIds as string[])
      : days.flatMap((d) => d.stops.map((s) => s.placeId));

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        itinerary_id: itineraryRow.id,
        user_id: user.id,
        guest_email: body.guestEmail,
        guest_name: body.guestName,
        status: "confirmed",
      })
      .select("id")
      .single();
    if (bookingError || !booking) {
      return NextResponse.json(
        { ok: false, message: bookingError?.message ?? "Failed to create booking" },
        { status: 500 }
      );
    }

    const stopRows = days.flatMap((d) =>
      d.stops
        .filter((s) => selectedStopIds.includes(s.placeId))
        .map((s) => ({
          booking_id: booking.id,
          place_id: s.placeId,
          place_name: s.name,
          stop_type: s.type,
        }))
    );
    if (stopRows.length > 0) {
      const { error: stopsError } = await supabase.from("booking_stops").insert(stopRows);
      if (stopsError) {
        return NextResponse.json(
          { ok: false, message: "Failed to save booking stops" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
      message: "Booking received. Confirmation will be sent to your email.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
