import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map, Route, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/40 to-background px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Your ideal trip, one questionnaire away
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              DreamedTrip helps you discover the perfect itinerary. Answer a few
              questions, get a tailored route with places, prices and times—then
              reserve everything in one place when you’re ready.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="min-w-[200px]">
                <Link href="/plan">Plan my trip</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/plan">See how it works</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Route className="size-6" />
              </div>
              <h3 className="mt-4 font-medium">1. Tell us your style</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Answer a few questions about destination, budget, pace and
                interests. No map or options until we know what you like.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Map className="size-6" />
              </div>
              <h3 className="mt-4 font-medium">2. Get your itinerary</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See a recommended route on an interactive map with places,
                prices and times. Free to explore and adjust.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-6" />
              </div>
              <h3 className="mt-4 font-medium">3. Reserve with confidence</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Book transport, accommodation, guides and activities in one
                flow. One confirmation, one trip.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm text-muted-foreground">
              Free tier: search and get your ideal route. Paid tier: reserve
              with us and get transport, food, guides and activities secured.
            </p>
            <Button variant="link" asChild className="mt-2">
              <Link href="/plan">Start planning</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
