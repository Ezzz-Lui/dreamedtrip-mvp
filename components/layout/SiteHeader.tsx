"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getItineraryFromStorage } from "@/lib/api/itinerary";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Map, Calendar, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [hasItinerary, setHasItinerary] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setHasItinerary(!!getItineraryFromStorage());
  }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 ml-2">
                  <Avatar className="size-6">
                    <AvatarFallback className="text-xs">
                      {user.email?.slice(0, 2).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="gap-2 cursor-pointer">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" className="gap-1.5 text-muted-foreground">
                  <LogIn className="size-4" />
                  Log in
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/signup" className="gap-1.5">
                  <UserPlus className="size-4" />
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
