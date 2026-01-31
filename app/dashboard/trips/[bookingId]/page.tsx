"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PlaceContactCard } from "@/components/dashboard/PlaceContactCard";
import { EmergencyNumbersBlock } from "@/components/dashboard/EmergencyNumbersBlock";
import { ReportIssueForm } from "@/components/dashboard/ReportIssueForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

interface BookingDetail {
  id: string;
  itinerary_id: string;
  guest_email: string;
  guest_name: string;
  status: string;
  created_at: string;
  itineraries: { days: unknown[]; summary: { totalDays?: number; totalEstimatedCost?: number; destinationLabel?: string } } | null;
  booking_stops: Array<{ id: string; place_id: string; place_name: string; stop_type: string }>;
  place_contacts: Record<string, { phone?: string; email?: string; emergency_phone?: string }>;
  emergency_numbers: Array<{ country_code: string; label: string; number: string; sort_order: number }>;
}

export default function TripDetailPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`, { credentials: "include" });
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setBooking(data.booking);
      } catch {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    }
    if (bookingId) fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-2xl space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Trip not found.</p>
        <Button asChild variant="link" className="mt-2">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  const summary = booking.itineraries?.summary ?? {};
  const destinationLabel = summary.destinationLabel ?? "Trip";
  const totalDays = summary.totalDays ?? 0;
  const totalCost = summary.totalEstimatedCost ?? 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="gap-2">
              <ArrowLeft className="size-4" />
              My trips
            </Link>
          </Button>
          <ReportIssueForm bookingId={bookingId} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="size-4" />
              <span>{destinationLabel}</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Trip details</h1>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {totalDays} day{totalDays !== 1 ? "s" : ""} · Estimated total ${totalCost} · Booked{" "}
              {new Date(booking.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="font-semibold">Emergency numbers</h2>
          <EmergencyNumbersBlock numbers={booking.emergency_numbers} />
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Place contacts</h2>
          <p className="text-sm text-muted-foreground">
            Contact details for the places you booked. Use these to reach the establishment directly.
          </p>
          {booking.booking_stops.length === 0 ? (
            <p className="text-sm text-muted-foreground">No stops in this booking.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1">
              {booking.booking_stops.map((stop) => (
                <PlaceContactCard
                  key={stop.id}
                  placeName={stop.place_name}
                  stopType={stop.stop_type}
                  phone={booking.place_contacts[stop.place_id]?.phone}
                  email={booking.place_contacts[stop.place_id]?.email}
                  emergency_phone={booking.place_contacts[stop.place_id]?.emergency_phone}
                />
              ))}
            </div>
          )}
        </div>

        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Need help? Report an issue and we will assist you or put you in touch with the establishment.
            </p>
            <ReportIssueForm bookingId={bookingId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
