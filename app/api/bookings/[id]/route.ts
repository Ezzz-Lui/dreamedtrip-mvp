import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select(
      `
      id,
      itinerary_id,
      guest_email,
      guest_name,
      status,
      created_at,
      itineraries ( id, days, summary )
    `
    )
    .eq("id", bookingId)
    .eq("user_id", user.id)
    .single();
  if (bookingError || !booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }
  const { data: stops } = await supabase
    .from("booking_stops")
    .select("id, place_id, place_name, stop_type")
    .eq("booking_id", bookingId);
  const placeIds = (stops ?? []).map((s) => s.place_id);
  let placeContacts: Record<string, { phone?: string; email?: string; emergency_phone?: string }> = {};
  if (placeIds.length > 0) {
    const { data: contacts } = await supabase
      .from("place_contacts")
      .select("place_id, phone, email, emergency_phone")
      .in("place_id", placeIds);
    (contacts ?? []).forEach((c) => {
      placeContacts[c.place_id] = {
        phone: c.phone ?? undefined,
        email: c.email ?? undefined,
        emergency_phone: c.emergency_phone ?? undefined,
      };
    });
  }
  const destinationLabel = (booking.itineraries as { summary?: { destinationLabel?: string } } | null)?.summary?.destinationLabel ?? "";
  const countryCodeMap: Record<string, string> = {
    "Costa Rica": "CR",
    Guatemala: "GT",
    Panama: "PA",
    Belize: "BZ",
    Honduras: "HN",
    "El Salvador": "SV",
    Nicaragua: "NI",
  };
  const countryCode = countryCodeMap[destinationLabel] ?? "";
  const { data: emergencyNumbers } = await supabase
    .from("emergency_numbers")
    .select("country_code, label, number, sort_order")
    .in("country_code", ["default", countryCode])
    .order("sort_order", { ascending: true });
  return NextResponse.json({
    booking: {
      ...booking,
      booking_stops: stops ?? [],
      place_contacts: placeContacts,
      emergency_numbers: emergencyNumbers ?? [],
    },
  });
}
