"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

interface TripCardProps {
  bookingId: string;
  destinationLabel?: string;
  totalDays: number;
  created_at: string;
  status: string;
  isPast: boolean;
}

export function TripCard({
  bookingId,
  destinationLabel,
  totalDays,
  created_at,
  status,
  isPast,
}: TripCardProps) {
  const dateLabel = new Date(created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Card className="transition-colors hover:bg-accent/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" />
          <span className="font-medium">
            {destinationLabel ?? "Trip"}
          </span>
        </div>
        <Badge variant={isPast ? "secondary" : "default"}>
          {isPast ? "Past" : "In progress"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          {totalDays} day{totalDays !== 1 ? "s" : ""} · Booked {dateLabel}
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-between mt-2" asChild>
          <Link href={`/dashboard/trips/${bookingId}`}>
            View detail
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
