"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Itinerary } from "@/lib/types/itinerary";
import { getItineraryFromStorage } from "@/lib/api/itinerary";
import {
  createBooking,
  buildBookingRequest,
  type BookingResponse,
} from "@/lib/api/bookings";
import { saveItinerary } from "@/lib/api/itinerary";
import { bookingFormSchema, type BookingFormSchema } from "@/lib/schemas/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle } from "lucide-react";

const STOP_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  activity: "Activity",
  attraction: "Attraction",
  transport: "Transport",
  guide: "Guide",
};

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { guestEmail: "", guestName: "", notes: "" },
  });

  useEffect(() => {
    async function load() {
      const itineraryId = searchParams.get("itineraryId");
      let stored = getItineraryFromStorage();
      if (!stored) {
        router.replace("/itinerary");
        setLoading(false);
        return;
      }
      // If itinerary was generated before login, save it to get a DB id (UUID) for booking
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(stored.id);
      if (!isUuid) {
        const saved = await saveItinerary(stored);
        if (saved) stored = saved;
      }
      setItinerary(stored);
      setLoading(false);
    }
    load();
  }, [router, searchParams]);

  const onConfirmBooking = async (values: BookingFormSchema) => {
    if (!itinerary) return;
    setSubmitting(true);
    try {
      const request = buildBookingRequest(
        itinerary,
        values.guestEmail,
        values.guestName
      );
      if (values.notes) request.notes = values.notes;
      const result = await createBooking(request);
      setBookingResult(result);
      setStep(3);
      if (result.ok) {
        toast.success("Booking received", {
          description: result.message ?? "Confirmation will be sent to your email.",
        });
      } else {
        toast.error("Booking failed", { description: result.message });
      }
    } catch (e) {
      toast.error("Error", {
        description: e instanceof Error ? e.message : "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-2xl">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return null;
  }

  const totalCost = itinerary.summary.totalEstimatedCost;
  const allStops = itinerary.days.flatMap((d) =>
    d.stops.map((s) => ({ ...s, dayIndex: d.dayIndex }))
  );

  if (step === 3 && bookingResult?.ok) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-xl space-y-6 py-12">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="size-16 text-primary mb-4" />
            <h1 className="text-2xl font-semibold">Booking received</h1>
            <p className="text-muted-foreground mt-2">
              {bookingResult.message ??
                "We will send confirmation to your email shortly."}
            </p>
            {bookingResult.bookingId && (
              <p className="text-sm text-muted-foreground mt-1">
                Reference: {bookingResult.bookingId}
              </p>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/dashboard">View my trips</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/itinerary">View itinerary</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Reserve with DreamedTrip
          </h1>
          <p className="text-muted-foreground mt-1">
            Secure your transport, accommodation and activities in one place.
          </p>
        </div>

        <div className="flex gap-2 text-sm">
          <span
            className={
              step >= 1 ? "font-medium text-foreground" : "text-muted-foreground"
            }
          >
            1. Review
          </span>
          <span className="text-muted-foreground">/</span>
          <span
            className={
              step >= 2 ? "font-medium text-foreground" : "text-muted-foreground"
            }
          >
            2. Your details
          </span>
          <span className="text-muted-foreground">/</span>
          <span
            className={
              step === 3 ? "font-medium text-foreground" : "text-muted-foreground"
            }
          >
            3. Confirmation
          </span>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Itinerary summary</CardTitle>
              <p className="text-sm text-muted-foreground">
                {itinerary.summary.totalDays} day
                {itinerary.summary.totalDays !== 1 ? "s" : ""} · Estimated total: $
                {totalCost}
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allStops.map((stop) => (
                    <TableRow key={stop.placeId}>
                      <TableCell>Day {stop.dayIndex}</TableCell>
                      <TableCell className="font-medium">{stop.name}</TableCell>
                      <TableCell>
                        {STOP_TYPE_LABELS[stop.type] ?? stop.type}
                      </TableCell>
                      <TableCell className="text-right">
                        {stop.price != null ? `~$${stop.price}` : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setStep(2)}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onConfirmBooking)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="guestName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guestEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We will send the confirmation here.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Special requests..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? "Sending…" : "Reserve with DreamedTrip"}
                      </Button>
                    </div>
                  </form>
                </Form>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/itinerary">Back to itinerary</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookPageSkeleton />}>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
