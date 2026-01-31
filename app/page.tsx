import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Map,
  Route,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  CreditCard,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero: full-impact, warm gradient, single CTA */}
      <section
        className="relative overflow-hidden border-b"
        aria-label="Hero"
      >
        {/* Background: subtle gradient mesh + grain feel (no purple) */}
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.75_0.04_85/.15),transparent)]
            dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.35_0.06_85/.25),transparent)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,oklch(0.92_0.02_200/.08),transparent)]
            dark:bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,oklch(0.25_0.03_200/.12),transparent)]"
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-32 sm:pt-32 sm:pb-40">
          <p
            className="landing-reveal landing-reveal-1 font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            style={{ animationFillMode: "forwards" }}
          >
            Your trip, designed for you
          </p>
          <h1
            className="landing-reveal landing-reveal-2 font-display mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ animationFillMode: "forwards" }}
          >
            One questionnaire.
            <br />
            <span className="text-primary">Your ideal itinerary.</span>
          </h1>
          <p
            className="landing-reveal landing-reveal-3 mt-6 max-w-xl text-lg text-muted-foreground"
            style={{ animationFillMode: "forwards" }}
          >
            DreamedTrip builds a personalized route—destinations, times, and
            prices—then lets you reserve transport, stays, and activities in one
            place. No endless searching.
          </p>
          <div
            className="landing-reveal landing-reveal-4 mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            style={{ animationFillMode: "forwards" }}
          >
            <Button size="lg" asChild className="min-w-[200px] gap-2">
              <Link href="/plan">
                Plan my trip
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works: asymmetric, numbered steps */}
      <section
        id="how"
        className="scroll-mt-20 mx-auto max-w-5xl px-4 py-20 sm:py-28"
        aria-labelledby="how-heading"
      >
        <h2
          id="how-heading"
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          How it works
        </h2>
        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
          <div className="group relative flex flex-col sm:border-r sm:border-border sm:pr-8 last:sm:border-r-0 last:sm:pr-0">
            <span
              className="font-display text-4xl font-bold tabular-nums text-muted/60 transition-colors group-hover:text-primary"
              aria-hidden
            >
              01
            </span>
            <div className="mt-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Route className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              Tell us your style
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Answer a few questions: destination, budget, pace, interests. We
              don’t show maps or options until we know what you like.
            </p>
          </div>
          <div className="group relative flex flex-col sm:border-r sm:border-border sm:pr-8 last:sm:border-r-0 last:sm:pr-0">
            <span
              className="font-display text-4xl font-bold tabular-nums text-muted/60 transition-colors group-hover:text-primary"
              aria-hidden
            >
              02
            </span>
            <div className="mt-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Map className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              Get your itinerary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              See your route on an interactive map with places, times, and
              prices. Free to explore and adjust before you book.
            </p>
          </div>
          <div className="group relative flex flex-col sm:border-r sm:border-border sm:pr-8 last:sm:border-r-0 last:sm:pr-0">
            <span
              className="font-display text-4xl font-bold tabular-nums text-muted/60 transition-colors group-hover:text-primary"
              aria-hidden
            >
              03
            </span>
            <div className="mt-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">
              Reserve with confidence
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Book transport, accommodation, guides, and activities in one flow.
              One confirmation, one trip—with support when you’re on the road.
            </p>
          </div>
        </div>
      </section>

      {/* Value: free vs paid, trust signals */}
      <section
        className="border-t bg-muted/30 px-4 py-16 sm:py-20"
        aria-labelledby="value-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="value-heading"
            className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Plan free. Book when you’re ready.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Free: get your ideal route and explore it. Paid: reserve everything
            with us—transport, stays, guides, activities—and get emergency
            numbers and trip support in your dashboard.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              AI-built itineraries
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="size-4 text-primary" />
              Secure payment
            </span>
            <span className="inline-flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              One checkout
            </span>
          </div>
          <Button asChild className="mt-8">
            <Link href="/plan">Start planning</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
