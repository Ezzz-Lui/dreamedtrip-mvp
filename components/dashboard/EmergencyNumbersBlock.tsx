"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Phone } from "lucide-react";

interface EmergencyNumber {
  country_code: string;
  label: string;
  number: string;
  sort_order: number;
}

interface EmergencyNumbersBlockProps {
  numbers: EmergencyNumber[];
}

export function EmergencyNumbersBlock({ numbers }: EmergencyNumbersBlockProps) {
  if (numbers.length === 0) return null;
  return (
    <Card className="border-amber-500/50 bg-amber-500/5 dark:bg-amber-500/10">
      <CardHeader className="pb-2">
        <h3 className="font-semibold flex items-center gap-2">
          <Phone className="size-4" />
          Emergency numbers
        </h3>
        <p className="text-sm text-muted-foreground">
          Keep these visible during your trip.
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {numbers.map((n) => (
          <div
            key={`${n.country_code}-${n.label}`}
            className="flex items-center justify-between rounded-md bg-background/80 px-3 py-2 text-sm"
          >
            <span className="text-muted-foreground">{n.label}</span>
            <a
              href={`tel:${n.number}`}
              className="font-medium text-primary hover:underline"
            >
              {n.number}
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
