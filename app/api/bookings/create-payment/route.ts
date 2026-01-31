import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VUDY_BASE = process.env.VUDY_API_BASE_URL ?? "https://api.vudy.app";
const VUDY_CREATE_PATH = "/channel/vudy/request/create";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.itineraryId || !body.guestEmail || !body.guestName) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const apiKey = process.env.VUDY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, message: "Payment is not configured" },
        { status: 503 }
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
    const summary = (itineraryRow.summary ?? { totalEstimatedCost: 0 }) as { totalEstimatedCost?: number };
    const amount = Number(summary.totalEstimatedCost) || 0;
    if (amount <= 0) {
      return NextResponse.json(
        { ok: false, message: "Invalid itinerary total cost" },
        { status: 400 }
      );
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        itinerary_id: itineraryRow.id,
        user_id: user.id,
        guest_email: body.guestEmail,
        guest_name: body.guestName,
        status: "pending_payment",
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

    const vudyPayload = {
      amount,
      channelParams: {
        customId: booking.id,
        note: `DreamedTrip booking ${booking.id}`,
        currencyToken: "USD",
      },
    };
    const vudyRes = await fetch(`${VUDY_BASE}${VUDY_CREATE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(vudyPayload),
    });
    const vudyData = (await vudyRes.json()) as {
      success?: boolean;
      data?: { id?: string; requestId?: string; url?: string; requestUrl?: string };
      error?: { message?: string };
    };
    if (!vudyRes.ok) {
      return NextResponse.json(
        { ok: false, message: vudyData?.error?.message ?? "Payment request failed" },
        { status: 502 }
      );
    }
    const requestId = vudyData?.data?.id ?? vudyData?.data?.requestId;
    const requestUrl = vudyData?.data?.url ?? vudyData?.data?.requestUrl;
    if (requestId) {
      await supabase
        .from("bookings")
        .update({ vudy_request_id: requestId })
        .eq("id", booking.id);
    }
    if (!requestUrl) {
      return NextResponse.json(
        { ok: false, message: "Payment URL not returned" },
        { status: 502 }
      );
    }
    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
      requestUrl,
      requestId: requestId ?? undefined,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: e instanceof Error ? e.message : "Bad request" },
      { status: 400 }
    );
  }
}
