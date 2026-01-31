import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Route, CheckCircle2, MapPin, Star } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";

// One per country, starting with El Salvador: SV → GT → HN → NI → CR → PA (repeat)
const featuredDestinations = [
  { name: "Suchitoto", country: "El Salvador", description: "Colonial town overlooking Lake Suchitlán, known for cobblestone streets, art galleries, and indigo workshops.", rating: 4.7, reviews: 1156, image: "🎨", highlights: ["Colonial Town", "Lake Views", "Indigo & Arts"] },
  { name: "Antigua Guatemala", country: "Guatemala", description: "Colonial charm meets volcanic landscapes in this UNESCO World Heritage site.", rating: 4.8, reviews: 2847, image: "🏛️", highlights: ["Colonial Architecture", "Volcano Views", "Coffee Tours"] },
  { name: "Roatán Island", country: "Honduras", description: "Caribbean paradise with world-class diving and pristine coral reefs.", rating: 4.7, reviews: 1923, image: "🏝️", highlights: ["Scuba Diving", "Beach Resorts", "Marine Life"] },
  { name: "Granada", country: "Nicaragua", description: "Colonial jewel on the shores of Lake Nicaragua with vibrant culture.", rating: 4.6, reviews: 1654, image: "🏰", highlights: ["Colonial City", "Lake Tours", "Volcano Boarding"] },
  { name: "Manuel Antonio", country: "Costa Rica", description: "National park combining pristine beaches with lush rainforest and wildlife.", rating: 4.9, reviews: 4102, image: "🐒", highlights: ["Wildlife Watching", "Beaches", "Rainforest Trails"] },
  { name: "Bocas del Toro", country: "Panama", description: "Caribbean archipelago with turquoise waters, coral reefs, and laid-back vibes.", rating: 4.7, reviews: 2156, image: "🌴", highlights: ["Island Hopping", "Snorkeling", "Beach Life"] },
  { name: "El Tunco", country: "El Salvador", description: "Pacific surf town with black-sand beaches, world-class waves, and a lively backpacker scene.", rating: 4.6, reviews: 1892, image: "🏄", highlights: ["Surfing", "Beach Life", "Nightlife"] },
  { name: "Lake Atitlán", country: "Guatemala", description: "Stunning volcanic lake surrounded by indigenous villages and three majestic volcanoes.", rating: 4.9, reviews: 3241, image: "🌋", highlights: ["Volcano Hiking", "Indigenous Culture", "Water Activities"] },
  { name: "Copán Ruinas", country: "Honduras", description: "Ancient Maya archaeological site with intricate hieroglyphic stairways.", rating: 4.8, reviews: 1432, image: "🗿", highlights: ["Maya Ruins", "Archaeology", "Bird Watching"] },
  { name: "León", country: "Nicaragua", description: "Historic city with revolutionary heritage and nearby volcano boarding.", rating: 4.5, reviews: 987, image: "🏔️", highlights: ["Colonial History", "Volcano Boarding", "Art & Culture"] },
  { name: "Monteverde", country: "Costa Rica", description: "Cloud forest reserve offering unique biodiversity and canopy adventures.", rating: 4.8, reviews: 2891, image: "🌿", highlights: ["Cloud Forest", "Zip-lining", "Wildlife"] },
  { name: "Casco Viejo", country: "Panama", description: "Historic quarter of Panama City with restored colonial architecture.", rating: 4.6, reviews: 2341, image: "🏙️", highlights: ["Historic District", "Nightlife", "Rooftop Bars"] },
  { name: "Ruta de las Flores", country: "El Salvador", description: "Scenic mountain route through colorful villages, coffee farms, and weekend food festivals.", rating: 4.8, reviews: 1423, image: "🌸", highlights: ["Coffee Tours", "Mountain Villages", "Gastronomy"] },
  { name: "Semuc Champey", country: "Guatemala", description: "Natural limestone bridge with turquoise pools in the jungle.", rating: 4.9, reviews: 1876, image: "💧", highlights: ["Natural Pools", "Cave Tubing", "Jungle Adventure"] },
  { name: "Ometepe Island", country: "Nicaragua", description: "Volcanic island in Lake Nicaragua with twin peaks and ancient petroglyphs.", rating: 4.7, reviews: 1234, image: "🌋", highlights: ["Twin Volcanoes", "Petroglyphs", "Kayaking"] },
  { name: "Lago de Coatepeque", country: "El Salvador", description: "Stunning crater lake with turquoise waters, surrounded by volcanoes and lakeside restaurants.", rating: 4.7, reviews: 987, image: "💎", highlights: ["Crater Lake", "Volcano Views", "Water Sports"] }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/40 to-background">
          {/* Animated illustration background */}
          <div className="absolute inset-0 pointer-events-none">
            <HeroIllustration />
          </div>
          
          {/* Content */}
          <div className="relative px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              {/* Title with better contrast */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-sm">
                Your ideal trip, one questionnaire away
              </h1>
              
              {/* Description with background for better readability */}
              <div className="mt-6 inline-block">
                <p className="text-lg sm:text-xl px-6 py-4 rounded-2xl bg-background/80 backdrop-blur-sm shadow-lg border">
                  DreamedTrip helps you discover the perfect itinerary across Central America. 
                  Answer a few questions, get a tailored route with places, prices and times—then
                  reserve everything in one place when you're ready.
                </p>
              </div>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="min-w-[200px] shadow-lg">
                  <Link href="/plan">Plan my trip</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="shadow-lg bg-background/80 backdrop-blur-sm">
                  <Link href="#how-it-works">See how it works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Discover Central America's Hidden Gems
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Book local guides, accommodation, and transportation for these amazing destinations
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <Card key={destination.name} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                    {destination.image}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="size-3" />
                          {destination.country}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        <Star className="size-3 mr-1 fill-current" />
                        {destination.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {destination.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {destination.highlights.slice(0, 2).map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{destination.reviews.toLocaleString()} reviews</span>
                      <Button size="sm" variant="ghost" asChild className="h-8 text-xs">
                        <Link href="/plan">Book now</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/plan">Explore all destinations</Link>
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="border-t bg-muted/30 px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How it works
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Three simple steps to your perfect Central American adventure
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  1
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Route className="size-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tell us your style</h3>
                <p className="text-sm text-muted-foreground">
                  Answer a few questions about destination, budget, pace and
                  interests. No map or options until we know what you like.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  2
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Map className="size-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get your itinerary</h3>
                <p className="text-sm text-muted-foreground">
                  See a recommended route on an interactive map with places,
                  prices and times. Free to explore and adjust.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  3
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <CheckCircle2 className="size-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reserve with confidence</h3>
                <p className="text-sm text-muted-foreground">
                  Book transport, accommodation, guides and activities in one
                  flow. One confirmation, one trip.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
              Ready to start your adventure?
            </h2>
            <p className="text-muted-foreground mb-8">
              Free tier: search and get your ideal route. Paid tier: reserve
              with us and get transport, food, guides and activities secured.
            </p>
            <Button size="lg" asChild className="min-w-[200px]">
              <Link href="/plan">Start planning now</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
