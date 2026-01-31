"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getItineraryFromStorage } from "@/lib/api/itinerary";
import { Map, Calendar, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [hasItinerary, setHasItinerary] = useState(false);

  useEffect(() => {
    setHasItinerary(!!getItineraryFromStorage());
  }, [pathname]);

  const nav = [
    { href: "/plan", label: "Plan trip" },
    ...(hasItinerary ? [{ href: "/itinerary", label: "My itinerary" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Map className="size-5 text-primary" />
          <span>DreamedTrip</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              asChild
            >
              <Link
                href={item.href}
                className={cn(
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                {item.label}
              </Link>
            </Button>
          ))}
          <Button variant="outline" size="sm" asChild className="ml-2">
            <Link href="/plan" className="gap-1.5">
              <Calendar className="size-4" />
              Plan my trip
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/plan" className="gap-1.5 text-muted-foreground">
              <LogIn className="size-4" />
              Log in
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
