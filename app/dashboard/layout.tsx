import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My trips — DreamedTrip",
  description: "View your trips, contacts and emergency numbers.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
