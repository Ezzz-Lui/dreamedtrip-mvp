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
  buildBookingRequest,
  createPaymentRequest,
  type BookingResponse,
} from "@/lib/api/bookings";
import { saveItinerary } from "@/lib/api/itinerary";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
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
import { LogIn, UserPlus } from "lucide-react";

const STOP_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  activity: "Activity",
  attraction: "Attraction",
  transport: "Transport",
  guide: "Guide",
};

function TripSummaryCard({
  itinerary,
  totalCost,
  allStops,
}: {
  itinerary: Itinerary;
  totalCost: number;
  allStops: Array<{ placeId: string; name: string; type: string; price?: number; dayIndex: number }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Trip summary</CardTitle>
        <p className="text-sm text-muted-foreground">
          {itinerary.summary.totalDays} day
          {itinerary.summary.totalDays !== 1 ? "s" : ""} · Estimated total: ${totalCost}
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
                <TableCell>{STOP_TYPE_LABELS[stop.type] ?? stop.type}</TableCell>
                <TableCell className="text-right">
                  {stop.price != null ? `~$${stop.price}` : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
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

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthChecked(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!authChecked || !user) return;
    const stepParam = searchParams.get("step");
    if (stepParam === "details") setStep(3);
    const email = user.email ?? "";
    if (email && form.getValues("guestEmail") === "") form.setValue("guestEmail", email);
  }, [authChecked, user, searchParams, form]);

  const goNextFromReview = () => {
    if (user) setStep(3);
    else setStep(2);
  };

  const onPayment = async (values: BookingFormSchema) => {
    if (!itinerary) return;
    setSubmitting(true);
    try {
      const request = buildBookingRequest(itinerary, values.guestEmail, values.guestName);
      if (values.notes) request.notes = values.notes;
      const result = await createPaymentRequest(request);
      const data = result as BookingResponse & { requestUrl?: string };
      if (data.ok && data.requestUrl) {
        window.location.href = data.requestUrl;
        return;
      }
      toast.error("Payment setup failed", { description: data.message ?? "Try again." });
    } catch (e) {
      toast.error("Error", {
        description: e instanceof Error ? e.message : "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !authChecked) {
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
  const redirectBook = "/book?step=details";

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Reserve with DreamedTrip
          </h1>
          <p className="text-muted-foreground mt-1">
            Secure your transport, accommodation and activities in one place. Payment required to confirm.
          </p>
        </div>

        <div className="flex gap-2 text-sm">
          <span className={step >= 1 ? "font-medium text-foreground" : "text-muted-foreground"}>
            1. Review
          </span>
          <span className="text-muted-foreground">/</span>
          <span className={step >= 2 ? "font-medium text-foreground" : "text-muted-foreground"}>
            2. Account
          </span>
          <span className="text-muted-foreground">/</span>
          <span className={step >= 3 ? "font-medium text-foreground" : "text-muted-foreground"}>
            3. Your details & payment
          </span>
        </div>

        {step === 1 && (
          <>
            <TripSummaryCard itinerary={itinerary} totalCost={totalCost} allStops={allStops} />
            <div className="mt-4 flex justify-end">
              <Button onClick={goNextFromReview}>Continue</Button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-semibold mb-2">Your trip</h2>
              <TripSummaryCard itinerary={itinerary} totalCost={totalCost} allStops={allStops} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Create an account or log in</CardTitle>
                <p className="text-sm text-muted-foreground">
                  To complete your reservation and pay securely, sign in or create a free account.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button asChild variant="default" className="w-full gap-2">
                    <Link href={`/login?redirect=${encodeURIComponent(redirectBook)}`}>
                      <LogIn className="size-4" />
                      Log in
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href={`/signup?redirect=${encodeURIComponent(redirectBook)}`}>
                      <UserPlus className="size-4" />
                      Sign up
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your details</CardTitle>
              <p className="text-sm text-muted-foreground">
                Next you will be redirected to secure payment to confirm this trip.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onPayment)} className="space-y-4">
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
                          <Input type="email" placeholder="you@example.com" {...field} />
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
                      onClick={() => setStep(user ? 1 : 2)}
                    >
                      Back
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Redirecting to payment…" : "Continue to payment"}
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
