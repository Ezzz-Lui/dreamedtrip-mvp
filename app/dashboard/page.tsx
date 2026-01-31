"use client";

import { useEffect, useState } from "react";
import { TripCard } from "@/components/dashboard/TripCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";

interface BookingItem {
  id: string;
  itinerary_id: string;
  guest_email: string;
  guest_name: string;
  status: string;
  created_at: string;
  itineraries: { days: unknown[]; summary: { totalDays?: number; totalEstimatedCost?: number; destinationLabel?: string } } | null;
}

function isPast(booking: BookingItem): boolean {
  if (booking.status === "completed" || booking.status === "cancelled") return true;
  const itinerary = booking.itineraries;
  if (!itinerary?.days?.length) return false;
  const days = itinerary.days as Array<{ date?: string }>;
  const lastDate = days.map((d) => d.date).filter(Boolean).pop();
  if (!lastDate) return false;
  return new Date(lastDate) < new Date();
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setBookings(data.bookings ?? []);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const inProgress = bookings.filter((b) => !isPast(b));
  const past = bookings.filter(isPast);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-3xl space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">My trips</h1>
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <MapPin className="size-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No trips yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Plan a trip and complete a booking to see it here.
            </p>
            <a
              href="/plan"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Plan my trip
            </a>
          </div>
        ) : (
          <Tabs defaultValue="in-progress">
            <TabsList>
              <TabsTrigger value="in-progress">
                In progress ({inProgress.length})
              </TabsTrigger>
              <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="in-progress" className="space-y-4 mt-4">
              {inProgress.length === 0 ? (
                <p className="text-muted-foreground text-sm">No trips in progress.</p>
              ) : (
                inProgress.map((b) => (
                  <TripCard
                    key={b.id}
                    bookingId={b.id}
                    destinationLabel={b.itineraries?.summary?.destinationLabel}
                    totalDays={b.itineraries?.summary?.totalDays ?? 0}
                    created_at={b.created_at}
                    status={b.status}
                    isPast={false}
                  />
                ))
              )}
            </TabsContent>
            <TabsContent value="past" className="space-y-4 mt-4">
              {past.length === 0 ? (
                <p className="text-muted-foreground text-sm">No past trips.</p>
              ) : (
                past.map((b) => (
                  <TripCard
                    key={b.id}
                    bookingId={b.id}
                    destinationLabel={b.itineraries?.summary?.destinationLabel}
                    totalDays={b.itineraries?.summary?.totalDays ?? 0}
                    created_at={b.created_at}
                    status={b.status}
                    isPast
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
