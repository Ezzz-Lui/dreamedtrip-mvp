/**
 * Bookings API client. Submit itinerary + selection for reservation (paid tier).
 */

import type { Itinerary } from "@/lib/types/itinerary";

export interface BookingRequest {
  itineraryId: string;
  selectedStopIds?: string[];
  guestEmail: string;
  guestName: string;
  notes?: string;
}

export interface BookingResponse {
  ok: boolean;
  bookingId?: string;
  message?: string;
  paymentUrl?: string;
}

export async function createBooking(
  request: BookingRequest
): Promise<BookingResponse> {
  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const data = (await res.json()) as BookingResponse;
    if (!res.ok) {
      return { ok: false, message: data.message ?? "Booking failed" };
    }
    return data;
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Network error",
    };
  }
}

export function buildBookingRequest(
  itinerary: Itinerary,
  guestEmail: string,
  guestName: string,
  selectedStopIds?: string[]
): BookingRequest {
  return {
    itineraryId: itinerary.id,
    selectedStopIds:
      selectedStopIds ??
      itinerary.days.flatMap((d) => d.stops.map((s) => s.placeId)),
    guestEmail,
    guestName,
  };
}
