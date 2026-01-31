import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your itinerary | DreamedTrip",
  description: "Your recommended route with map, places and prices.",
};

export default function ItineraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
