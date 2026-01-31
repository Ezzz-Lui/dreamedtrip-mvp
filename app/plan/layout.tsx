import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan your trip | DreamedTrip",
  description:
    "Answer a few questions so we can recommend your ideal itinerary.",
};

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
