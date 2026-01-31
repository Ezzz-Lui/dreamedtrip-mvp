"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Loader2 } from "lucide-react";

type Status = "loading" | "confirmed" | "pending" | "not_found";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!bookingId) {
      setStatus("not_found");
      return;
    }
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`, { credentials: "include" });
        if (!res.ok) {
          if (!cancelled) setStatus("not_found");
          return;
        }
        const data = await res.json();
        const booking = data.booking;
        if (!cancelled) {
          setStatus(booking?.status === "confirmed" ? "confirmed" : "pending");
        }
      } catch {
        if (!cancelled) setStatus("pending");
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
              <span className="font-medium">Processing your payment…</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              You will be able to see your trip in the dashboard once payment is confirmed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "confirmed") {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-xl space-y-6 py-12 text-center">
          <CheckCircle className="size-16 text-primary mx-auto" />
          <h1 className="text-2xl font-semibold">Booking confirmed</h1>
          <p className="text-muted-foreground">
            Your trip has been paid and confirmed. You can view it in your dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/dashboard">View my trips</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="font-semibold">Payment pending</h2>
            <p className="text-sm text-muted-foreground">
              Your payment is being processed. This usually takes a few moments. Check your dashboard shortly.
            </p>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <p className="text-muted-foreground">Booking not found.</p>
      <Button asChild variant="link" className="mt-2">
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  );
}

export default function BookSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background p-4 flex items-center justify-center">
          <Skeleton className="h-32 w-80" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
