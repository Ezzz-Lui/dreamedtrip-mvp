"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, AlertCircle } from "lucide-react";

interface PlaceContactCardProps {
  placeName: string;
  stopType: string;
  phone?: string;
  email?: string;
  emergency_phone?: string;
}

const STOP_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  activity: "Activity",
  attraction: "Attraction",
  transport: "Transport",
  guide: "Guide",
};

export function PlaceContactCard({
  placeName,
  stopType,
  phone,
  email,
  emergency_phone,
}: PlaceContactCardProps) {
  const hasContact = phone || email || emergency_phone;
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">{placeName}</span>
          <span className="text-xs text-muted-foreground">
            {STOP_TYPE_LABELS[stopType] ?? stopType}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {!hasContact ? (
          <p className="text-muted-foreground">Contact not available.</p>
        ) : (
          <>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="size-4" />
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="size-4" />
                {email}
              </a>
            )}
            {emergency_phone && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle className="size-4" />
                <a href={`tel:${emergency_phone}`} className="hover:underline">
                  Emergency: {emergency_phone}
                </a>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
